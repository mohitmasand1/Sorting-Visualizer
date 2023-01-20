async function swap(bars, i, j) {
    let temp = bars[i].style.height;
    bars[i].style.height = bars[j].style.height;
    bars[j].style.height = temp;
}

async function partition(bars, low, high) {
    labelSorted(bars[high]);
    // pivot
    let pivot = parseInt(bars[high].style.height);

    let i = (low - 1);
    
    for (let j = low; j <= high - 1; j++) {
        
        await delayTime();
        countAsComp();

        if (parseInt(bars[j].style.height) < pivot) {

            i++;
            labelSorting(bars[j]);
            swap(bars, i, j);

            await delayTime();
        }
    }

    await delayTime();
    swap(bars, i + 1, high);
    await delayTime();
    labelSorted(bars[i+1]);

    return (i + 1);
}

async function quickSort(bars, low, high) {
    countAsComp();
    if (low < high) {
        let pi = await partition(bars, low, high);
 
        await quickSort(bars, low, pi - 1);
        await quickSort(bars, pi + 1, high);
    }
}

async function doQuickSort() {
    const bars = document.querySelectorAll(".bar-item");
    const right = bars.length - 1;
    bars.forEach(element => labelUnsorted(element));
    resetCompCount();
    await quickSort(bars, 0, right);
    bars.forEach(element => labelSorted(element));
    await completeSort(bars);
}