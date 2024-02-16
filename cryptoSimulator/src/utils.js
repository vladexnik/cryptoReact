export function percentDifference(a, b) {
    const percent=parseFloat(+(100 * Math.abs( ( a - b ) / ( (a+b)/2 ) )));

    if( isNaN(percent)) {
        
        return '<0.01';
    }
    return percent.toFixed(2);
}

export function capitalize(str){
    return str.charAt(0).toUpperCase() + str.substr(1);
}