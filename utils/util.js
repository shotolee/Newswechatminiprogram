const formatTime = date => {
  var date = new Date(date);
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  if (year == new Date().getFullYear()) {
// 这里注掉的是当月份相同时，只显示日期。从页面显示上来说这样不好。应该是今天/昨天/前天/ 星期的方法。太难，暂时先这样。
// 当年份相同时，时间上不显示年，当日期相同时，仅显示时间。
//    if (month == new Date().getMonth()+1) {
      if (day == new Date().getDate()) {
        return [hour,minute].map(formatNumber).join(':')
      } else {
        return [month,day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
      } 
    // } else { 
    // return [month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
    // } 
  } else {
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
  }
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}