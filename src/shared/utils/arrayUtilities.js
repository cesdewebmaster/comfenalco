export const getMaxMin = (array) =>{
    if(array.length > 0){
        const obj = {
            min: Math.min(...array),
            max: Math.max(...array)
        };
        return obj;
    } else {
        return { min: null, max: null }
    }
}