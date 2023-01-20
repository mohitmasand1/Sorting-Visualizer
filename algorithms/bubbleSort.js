async function swaper(bars, xp, yp) {
    var temp = bars[xp].style.height;
    bars[xp].style.height = bars[yp].style.height;
    bars[yp].style.height = temp;
}

async function bubbleSort(bars, n) {
    var i, j;
    for (i = 0; i < n-1; i++) {
        for (j = 0; j < n-i-1; j++) {
            labelSorting(bars[j]);
            labelSorting(bars[j+1]);
            countAsComp();
            if (parseInt(bars[j].style.height) > parseInt(bars[j+1].style.height)) {
                labelSwap(bars[j]);
                await delayTime();
                swaper(bars, j, j+1);
            }
            labelUnsorted(bars[j]);
            labelUnsorted(bars[j+1]);
        }
        labelSorted(bars[n-i-1]);
    }    
    labelSorted(bars[0]);
}

async function doBubbleSort() {
    const bars = document.querySelectorAll(".bar-item");
    const len = bars.length;
    resetCompCount();
    await bubbleSort(bars, len);
    await completeSort(bars);
}