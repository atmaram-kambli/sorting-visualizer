import swap from '../Helper/Swap'

export const getSelectionSortAnimation = (array, arraySize) => {
    const animations = [];
    SelectionSort(array, arraySize, animations)
    return animations;
}


function SelectionSort(array, arraySize, animations) {
    for (let i = 0; i < arraySize - 1; i++) {
        let minInd = i;
        for(let j = i+1; j < arraySize; j++) {
            if(array[j] < array[minInd]) {
                minInd = j;                
            }
        }
        animations.push([i, minInd]);
        swap(array, i, minInd);
        animations.push([i, array[i], minInd, array[minInd]]);
        animations.push([i, minInd]);
        
    }
}