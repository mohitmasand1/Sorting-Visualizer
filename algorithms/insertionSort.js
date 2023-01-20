async function insertionSort() {
    const bars = document.querySelectorAll(".bar-item");
    let hitWhile = false;
    bars.forEach(element => labelUnsorted(element));

    for (let i = 1; i < bars.length; i++) {
        let key = bars[i].style.height;
        let j = i - 1;

        labelSorting(bars[i]);
        await delayTime();

        while (j >= 0 && parseInt(bars[j].style.height) > parseInt(key)) {
            countAsComp();
            hitWhile = true;
            swaps(bars[j+1], bars[j]);
            labelSorting(bars[j]);
            j--;

            await delayTime();
            for (let k = i; k >= 0; k--) {
                labelSorted(bars[k]);
            }
        }
        if (hitWhile) 
            hitWhile = false;
        else 
            4 * countAsComp();
        bars[j+1].style.height = key;
        labelSorted(bars[i]);
    }
}

async function doInsertionSort() {
    resetCompCount();
    await insertionSort();
    const bars = document.querySelectorAll(".bar-item");
    await completeSort(bars);
}