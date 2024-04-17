import swap from "../Helper/Swap";

export const getQuickSortAnimation = (array, arraySize) => {
    const animations = [];
    QuickSort(array, 0, arraySize-1, animations);
    return animations;
}


function QuickSort(array, low, high, animations) {
    if(low < high) {
        let pivot = partition(array, low, high, animations);
        QuickSort(array, low, pivot-1, animations);
        QuickSort(array, pivot+1, high, animations);
    }
}

function partition(array, low, high, animations) {
    let pivot = array[high];
    let i = (low - 1);

    for(let j = low; j < high; j++) {
        if(array[j] < pivot) {
            i++;
            animations.push([i, j]);
            swap(array, i, j);
            animations.push([i, array[i], j, array[j]]);
            animations.push([i, j]);
        }
    }
    animations.push([i+1, high]);
    swap(array, i+1, high);
    animations.push([i+1, array[i+1], high, array[high]]);
    animations.push([i+1, high]);

    return i+1;
}