async function merge(bars, l, m, r) {
    var n1 = m - l + 1;
    var n2 = r - m;
 
    // Create temp arrays
    var L = new Array(n1);
    var R = new Array(n2);
 
    // Copy data to temp arrays L[] and R[]
    for (var i = 0; i < n1; i++){
        await delayTime();
        labelSorting(bars[l+i]);
        L[i] = bars[l + i].style.height;
    }
    for (var j = 0; j < n2; j++) {
        await delayTime();
        labelSwap(bars[m+1+j]);
        R[j] = bars[m + 1 + j].style.height;
    }
    await delayTime();
 
    // Initial index of first subarray
    var i = 0;
 
    // Initial index of second subarray
    var j = 0;
 
    // Initial index of merged subarray
    var k = l;
 
    while (i < n1 && j < n2) {
        await delayTime();
        countAsComp();
        if (parseInt(L[i]) <= parseInt(R[j])) {
            swapers(bars[k], L, i);
            i++;
        }
        else {
            swapers(bars[k], R, j);
            j++;
        }
        k++;

        if (r === bars.length-1 && l === 0) {
            labelSorted(bars[0]);
            labelSorted(bars[k]);
        }
        
    }
    
    while (i < n1) {
        await delayTime();
        bars[k].style.height = L[i];
        i++;
        k++;
    }
 
    while (j < n2) {
        await delayTime();
        bars[k].style.height = R[j];
        j++;
        k++;
    }
}

async function mergeSort(bars, l, r) {
    if(l>=r){
        return;
    }
    var m =l+ parseInt((r-l)/2);
    await mergeSort(bars,l,m);
    await mergeSort(bars,m+1,r);
    await merge(bars,l,m,r);
}

function swapers(bar1, arr1, ind1) {
    let temp = bar1.style.height;
    bar1.style.height = arr1[ind1];
    arr1[ind1] = temp;
}

async function doMergeSort() {
    const bars = document.querySelectorAll(".bar-item");
    const right = bars.length - 1;
    bars.forEach(element => labelUnsorted(element));
    resetCompCount();
    await mergeSort(bars, 0, right);
    await completeSort(bars);
}