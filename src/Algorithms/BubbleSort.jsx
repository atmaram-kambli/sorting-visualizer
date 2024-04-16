import swap from '../Helper/Swap'

export const getBubbleSortAnimation = (array, arraySize) => {
    const animationArray = [];
    BubbleSort(array, arraySize, animationArray);
    return animationArray;
};


const BubbleSort = (array, size, animationArray) => {
    for (let i = 0; i < size - 1; i++) {
        for (let j = 0; j < size - i - 1; j++) {
            if(array[j] > array[j+1]) {
                animationArray.push([j, j + 1]);
                swap(array, j , j + 1);
                animationArray.push([j, array[j], j + 1, array[j+1]]);
                animationArray.push([j, j + 1]);
            }
        }        
    }
}
