
async function heapSort(bars) {
    var N = bars.length;
 
    // Build heap (rearrange array)
    for (var i = Math.floor(N / 2) - 1; i >= 0; i--)
        await heapify(bars, N, i);

    for (var i = N - 1; i > 0; i--) {
        // Move current root to end

        labelSorting(bars[0]);
        labelSwap(bars[i]);
        await delayTime();

        swaps(bars[0], bars[i]);
        labelUnsorted(bars[0]);

        labelSorted(bars[i]);
        await delayTime();

        // call max heapify on the reduced heap
        await heapify(bars, i, 0);
        labelSorted(bars[0]);
    }
}

async function heapify(bars, N, i) {
    var largest = i; // Initialize largest as root
    var l = 2 * i + 1; // left = 2*i + 1
    var r = 2 * i + 2; // right = 2*i + 2

    countAsComp();
    if (l < N && parseInt(bars[l].style.height) > parseInt(bars[largest].style.height)) {
        largest = l;
    }

    if (r < N && parseInt(bars[r].style.height) > parseInt(bars[largest].style.height)) {
        largest = r;
    }

    if (largest != i) {
        swaps(bars[i], bars[largest]);
        heapify(bars, N, largest);
    }
}

async function swaps(bar1, bar2) {
    let temp = bar1.style.height;
    bar1.style.height = bar2.style.height;
    bar2.style.height = temp;
}

async function doHeapSort() {
    const bars = document.querySelectorAll(".bar-item");
    bars.forEach(element => labelUnsorted(element));
    resetCompCount();
    await heapSort(bars);
    await completeSort(bars);
}