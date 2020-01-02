

function getHour(hour) {
  const num = new Intl.NumberFormat("en-US")
    .format(hour % 12 ? hour % 12 : 12)
  return num
}
function getAmPm(hour) {
  return Math.floor(hour / 12) ? "PM" : "AM"
}
export default function getDateTime( date = new Date(), seconds = false, sep = " @ " ) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

   return months[date.getMonth()]  + " "
    + date.getDate() + ", "
    + date.getFullYear() 
    + sep
    + getHour(date.getHours()) + ":"
    + new Intl.NumberFormat("en-US", { minimumIntegerDigits: 2 })
      .format(date.getMinutes())
    + (seconds ? ":" + new Intl.NumberFormat("en-US", { minimumIntegerDigits: 2 })
      .format(date.getSeconds()) + " " : " ")
    + getAmPm(date.getHours())
}