/*
*
*   Function for calculating stats of a list of transactions in an array. 
*   Helps determining the min, max, sum and more data.
*
*/
export function getStats(d) {
    var count, min, max, avg, minDate, maxDate, sum = 0;

    // you need a deep copy of the array so it wont mutate after sorting its reference
    const sl = [...d].sort((a,b) => a.native_amount - b.native_amount, 0);

    // counting the sum
    sl.forEach((i) => sum += i.native_amount);

    count = sl.length;
    avg = (sum / sl.length).toFixed(2) * 1; // * 1 -> quickfix to change back to Number type, maybe don't do this in the future
    
    min = sl[0].native_amount;
    minDate = sl[0].timestamp_utc;

    max = sl[sl.length-1].native_amount;
    maxDate = sl[sl.length-1].timestamp_utc;

    return { count, avg, min, minDate, max, maxDate, sum, sortedList: sl };
}