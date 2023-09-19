const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const formatDtStringWithDayOfWeek = ( dtString ) => {
    const dt = new Date(`${dtString} UTC`);
    const time = dt.toLocaleTimeString();
    return `${weekday[dt.getDay()]} at ${time}`
}

export const formatDtStringWithDate = ( dtString ) => {   
    const dt = new Date(`${dtString} UTC`);
    const time = dt.toLocaleTimeString();
    return `${month[dt.getMonth()]} ${dt.getDate()}th at ${time}`
}

export const isInCurrentWeek = ( dtString ) => {
    let today = new Date();
    let dt = new Date(dtString);
    let firstDayOfWeek = new Date(today.setDate(today.getDate() 
                               - today.getDay()));

    let lastDayOfWeek = new Date(today.setDate(today.getDate() 
                               - today.getDay() + 6));
    return dt <= lastDayOfWeek && dt >= firstDayOfWeek;                           
}