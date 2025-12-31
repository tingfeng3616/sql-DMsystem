/**
 * 构建脚本 - 自动从 index.html 提取 JSX 代码并生成 Vite 项目结构
 * 
 * 工作流程：
 * 1. 读取 index.html 中的 <script type="text/babel"> 内容
 * 2. 提取 CSS 样式
 * 3. 生成 src/main.jsx 和 src/index.css
 * 4. 生成 Vite 入口 HTML
 * 
 * 使用方法：保持编辑原始 index.html，推送时自动运行此脚本
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🚀 开始构建准备...\n');

// 读取原始 index.html
const indexPath = path.join(__dirname, 'index.html');
const html = fs.readFileSync(indexPath, 'utf-8');

// 确保 src 目录存在
const srcDir = path.join(__dirname, 'src');
if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir, { recursive: true });
}

// ========== 1. 提取 JSX 代码 ==========
console.log('📦 [1/3] 提取 JSX 代码...');

// 匹配 <script type="text/babel" data-type="module">...</script>
const babelScriptRegex = /<script\s+type=["']text\/babel["'][^>]*>([\s\S]*?)<\/script>/i;
const babelMatch = html.match(babelScriptRegex);

if (!babelMatch) {
    console.error('❌ 未找到 Babel 脚本块');
    process.exit(1);
}

let jsxCode = babelMatch[1];

// 转换 import 语句 - 使用本地安装的包
jsxCode = jsxCode
    .replace(/from\s+['"]react['"]/g, 'from "react"')
    .replace(/from\s+['"]react-dom['"]/g, 'from "react-dom"')
    .replace(/from\s+['"]react-dom\/client['"]/g, 'from "react-dom/client"')
    .replace(/from\s+['"]lucide-react['"]/g, 'from "lucide-react"');

// 添加 CSS 导入和 LeanCloud SDK 导入
const mainJsxContent = `import './index.css';
import AV from 'leancloud-storage';

// 将 AV 挂载到 window 对象以支持控制台脚本
window.AV = AV;

${jsxCode}
`;

fs.writeFileSync(path.join(srcDir, 'main.jsx'), mainJsxContent, 'utf-8');
console.log('   ✅ 已生成 src/main.jsx');

// ========== 2. 提取和生成 CSS ==========
console.log('🎨 [2/3] 提取样式...');

// 从 <style> 标签提取 CSS
const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
let cssContent = '';
let match;
while ((match = styleRegex.exec(html)) !== null) {
    cssContent += match[1] + '\n';
}

// 添加 Tailwind CSS 指令
const finalCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

/* 使用本地字体加载优化 */
@import url('https://fonts.loli.net/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap');

/* 从原 index.html 提取的自定义样式 */
${cssContent.replace(/@import\s+url\([^)]+\);?\s*/g, '')}
`;

fs.writeFileSync(path.join(srcDir, 'index.css'), finalCss, 'utf-8');
console.log('   ✅ 已生成 src/index.css');

// ========== 3. 生成 Vite 入口 HTML ==========
console.log('📄 [3/3] 生成入口 HTML...');

const viteHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>SQL-DMsystem管理后台</title>
    <link rel="icon" href="/alexico.png" type="image/png">
    
    <!-- DNS预连接优化 -->
    <link rel="dns-prefetch" href="https://fonts.loli.net">
    <link rel="preconnect" href="https://fonts.loli.net" crossorigin>
    
    <!-- Cloudflare Turnstile -->
    <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
</head>
<body class="text-slate-700 selection:bg-sky-100 selection:text-sky-700">
    <!-- 加载进度屏幕 -->
    <div id="loading-screen">
        <div>
            <div class="loader"></div>
            <div class="progress-text">加载中...</div>
        </div>
    </div>
    
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'index.vite.html'), viteHtml, 'utf-8');
console.log('   ✅ 已生成 index.vite.html');

// ========== 4. 复制静态资源 ==========
console.log('\n📁 复制静态资源...');
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

// 复制 libs/alexico.png 到 public 目录
const iconSrc = path.join(__dirname, 'libs', 'alexico.png');
const iconDest = path.join(publicDir, 'alexico.png');
if (fs.existsSync(iconSrc)) {
    fs.copyFileSync(iconSrc, iconDest);
    console.log('   ✅ 已复制 alexico.png 到 public 目录');
}

console.log('\n🎉 构建准备完成！接下来执行 vite build...\n');
