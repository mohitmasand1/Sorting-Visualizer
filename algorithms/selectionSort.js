
async function selectionSort() {
    const bars = document.querySelectorAll(".bar-item");
    for (let i = 0; i < bars.length; i++) {
        let min_index = i;
        labelSorting(bars[i]);

        for (let j = i+1; j < bars.length; j++) {

            labelSwap(bars[j]);
            await delayTime();

            countAsComp();
            if (parseInt(bars[j].style.height) < parseInt(bars[min_index].style.height)) {
                if (min_index !== i) {
                    labelUnsorted(bars[min_index]);
                }
                min_index = j;
            }
            else {
                labelUnsorted(bars[j]);
            }
        }

        await delayTime();
        let temp = bars[min_index].style.height;
        bars[min_index].style.height = bars[i].style.height;
        bars[i].style.height = temp;

        labelUnsorted(bars[min_index]);
        labelSorted(bars[i]);
    }
}

async function doSelectionSort() {
    resetCompCount();
    await selectionSort();
    const bars = document.querySelectorAll(".bar-item");
    await completeSort(bars);
}