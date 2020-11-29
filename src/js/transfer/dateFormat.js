export default function(format,date){
    
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    month = (month >= 10 ? '' + month:'0' + month)
    let day = date.getDate()
    day = (day >= 10?'' + day:'0' + day)
    
    format = format.replace("%yyyy",'' + year)
    format = format.replace("%MM",month)
    format = format.replace("%DD",day)
    return format
}