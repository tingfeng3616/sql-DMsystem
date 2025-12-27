$headers = @{
    "X-LC-Id" = "0K4AIJMJHwUIxhn6VWNIZBbK-gzGzoHsz"
    "X-LC-Key" = "F0rmpsJF9KNOhWz3NhcRiih2"
    "Content-Type" = "application/json"
}
$apiUrl = "https://0k4aijmj.lc-cn-n1-shared.com/1.1/batch"

$requests = @()

function Add-Class($coll, $maj, $cls, $coun) {
    return @{
        method = "POST"
        path = "/1.1/classes/CollegeConfig"
        body = @{
            college = $coll
            major = $maj
            classNum = $cls
            counselor = $coun
            studentCount = 40
            sortOrder = 0
        }
    }
}

# 智慧服务学院
$requests += Add-Class "智慧服务学院" "电子商务" "2401" "贺志佳"
$requests += Add-Class "智慧服务学院" "电子商务" "2402" "贺志佳"
$requests += Add-Class "智慧服务学院" "电子商务" "2501" "韩腾飞"
$requests += Add-Class "智慧服务学院" "电子商务" "2502" "韩腾飞"
$requests += Add-Class "智慧服务学院" "市场营销" "2401" "陈铎"
$requests += Add-Class "智慧服务学院" "市场营销" "2501" "陈铎"
$requests += Add-Class "智慧服务学院" "现代物流管理" "2401" "庄利铭"
$requests += Add-Class "智慧服务学院" "现代物流管理" "2501" "张巾蕾"

# 数智技术学院
$requests += Add-Class "数智技术学院" "计算机应用技术" "2401" "王春梅"
$requests += Add-Class "数智技术学院" "计算机应用技术" "2402" "王春梅"
$requests += Add-Class "数智技术学院" "计算机应用技术" "2403" "韩泽生"
$requests += Add-Class "数智技术学院" "计算机应用技术" "2501" "刘航宇"
$requests += Add-Class "数智技术学院" "计算机应用技术" "2502" "刘航宇"
$requests += Add-Class "数智技术学院" "计算机应用技术" "2503" "康晶"
$requests += Add-Class "数智技术学院" "软件技术" "2401" "方征"
$requests += Add-Class "数智技术学院" "软件技术" "2402" "方征"
$requests += Add-Class "数智技术学院" "软件技术" "2501" "汪春雷"
$requests += Add-Class "数智技术学院" "软件技术" "2502" "郭剑峰"
$requests += Add-Class "数智技术学院" "大数据技术" "2401" "张贺朗"
$requests += Add-Class "数智技术学院" "大数据技术" "2501" "张贺朗"

# 智能交通学院
$requests += Add-Class "智能交通学院" "新能源汽车技术" "2401" "杨小敏"
$requests += Add-Class "智能交通学院" "新能源汽车技术" "2402" "杨小敏"
$requests += Add-Class "智能交通学院" "新能源汽车技术" "2501" "吕影"
$requests += Add-Class "智能交通学院" "新能源汽车技术" "2502" "李丹丹"
$requests += Add-Class "智能交通学院" "汽车检测与维修技术" "2401" "高峰"
$requests += Add-Class "智能交通学院" "汽车检测与维修技术" "2501" "于小轶"
$requests += Add-Class "智能交通学院" "城市轨道交通运营管理" "2401" "范广友"
$requests += Add-Class "智能交通学院" "城市轨道交通运营管理" "2501" "范广友"

# 智能制造学院
$requests += Add-Class "智能制造学院" "机电一体化技术" "2401" "杨小敏"
$requests += Add-Class "智能制造学院" "机电一体化技术" "2402" "于济铭"
$requests += Add-Class "智能制造学院" "机电一体化技术" "2501" "梁雪"
$requests += Add-Class "智能制造学院" "工业机器人技术" "2401" "王耀家"
$requests += Add-Class "智能制造学院" "工业机器人技术" "2501" "王耀家"

$body = @{ requests = $requests } | ConvertTo-Json -Depth 10
Write-Host "Sending batch request..."
Invoke-RestMethod -Uri $apiUrl -Method Post -Headers $headers -Body $body
