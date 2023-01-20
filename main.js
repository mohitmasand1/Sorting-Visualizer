// Author: Mohit Masand
// Date Completed: January 19, 2023

var timer;
var counter = 0;

// Generates and displays a new random array between height 5 and 250
function regenerateArray(numBars) {
    removeArray();

    const bars = document.querySelector("#sort-bars");
    for (let i = 0; i < numBars; i++) {
        const height = Math.floor(Math.random() * (250-5) + 5);
        const bar = document.createElement("div");
        bar.style.height = `${height*2}px`;
        bar.classList.add('bar-item');
        bars.appendChild(bar);
    }
}

// Removes array from display
function removeArray() {
    const bar = document.querySelector("#sort-bars");
    bar.innerHTML = '';
}


// EVENT HANDLERS //

// Regenerates an array of chosen size and resets num comparisons and timer
const sizeSlider = document.querySelector("#size-slider");
let size = parseInt(sizeSlider.value);
sizeSlider.addEventListener("input", function() {
    size = parseInt(sizeSlider.value);
    regenerateArray(size);
    resetCompCount();
    resetTimer();
});

// Regenerates an array and resets num comparisons and timer
const newArray = document.querySelector("#newarray");
newArray.addEventListener("click", function() {
    regenerateArray(size);
    resetCompCount();
    resetTimer();
});

// Changes the speed (or wait time) between each operation while sorting
const speedDelaySlider = document.querySelector("#speed-slider");
let wait = 1000 - 10* parseInt(speedDelaySlider.value);
speedDelaySlider.addEventListener("input", function() {
    wait = 1000 - 10* parseInt(speedDelaySlider.value);
});

// Array of all available sorting algorithms
const sortItem = document.querySelectorAll('.sort');
// Currently selected algorithm by user
const selected = document.querySelector('.selected');

// Swaps algorithm name by the one user selected upon selection
sortItem.forEach(item => {
    item.addEventListener('click', () => {
        selected.innerHTML = item.innerHTML;
    })
})

// Executes the selected algorithm upon 'sort' click
const sortBtn = document.querySelector('#sort-btn');
sortBtn.addEventListener('click', () => {
    startTimer();
    disableButtonAndSlider();
    switch (selected.innerHTML) {
        case 'Selection Sort':
            doSelectionSort();
            break;
        case 'Insertion Sort':
            doInsertionSort();
            break;
        case 'Bubble Sort':
            doBubbleSort();
            break;
        case 'Merge Sort':
            doMergeSort();
            break;
        case 'Quick Sort':
            doQuickSort();
            break;
        case 'Heap Sort':
            doHeapSort();
            break;

    }
});


// HELPER FUNCTIONS //

// Returns a promise for the wait time
function delayTime() {
    return new Promise(resolve => {
        setTimeout(() => {resolve('')}, wait);
    });
}

// labels a bar as unsorted
function labelUnsorted(bar) {
    bar.style.background = '#e43f5a';
}

// labels a bar as swap
function labelSwap(bar) {
    bar.style.background = '#ffe800';
}

// labels a bar as sorting
function labelSorting(bar) {
    bar.style.background = 'blue';
}

// labels a bar as sorted
function labelSorted(bar) {
    bar.style.background = '#0d887b';
}

// Begins timer
function startTimer() {
    var ms = 0;
    var s = 0;
    const dial = document.querySelector('#timer');
    timer = setInterval(() => {
        dial.innerHTML = 'Time: ' + s + ':' + (ms/10) + 's';
        if (ms == 1000) {
            ms = 0;
            s++;
        }
        ms+=10;
    }, 1);
}

// Pauses timer
function pauseTimer() {
    clearInterval(timer);
}

// Completes the sort with a shining animation and enabling buttons and sliders for use
// Also pauses the timer as sorting is completed
async function completeSort(bars) {
    pauseTimer();
    let temp = wait;
    wait = 10;
    for (let i = 0; i < bars.length; i++) {
        await delayTime();
        bars[i].style.transition = 'background-color 0.5s ease';
        bars[i].style.background = 'rgba(255, 255, 255, 0.6)';
    }
    wait = 350;
    await delayTime();
    wait = temp;
    bars.forEach(element => {
        labelSorted(element);
    });
    wait = temp;
    enableButtonAndSlider();
}

// Comparison count incrementer
function countAsComp() {
    const count = document.querySelector('#counter');
    count.innerHTML = 'Comparisons: '+ (++counter);
}

// Resets the comparison counter
function resetCompCount() {
    counter = 0;
    const count = document.querySelector('#counter');
    count.innerHTML = 'Comparisons: ' + (0);
}

// Resets the timer to 00:00s
function resetTimer() {
    pauseTimer();
    const dial = document.querySelector('#timer');
    dial.innerHTML = 'Time: 00:00s';
}

// Enables buttons and sliders
function enableButtonAndSlider() {
    document.getElementById('size-slider').disabled = false;
    document.getElementById('newarray').disabled = false;
    document.getElementById('sort-btn').disabled = false;
}

// Disabled buttons and sliders
function disableButtonAndSlider() {
    document.getElementById('size-slider').disabled = true;
    document.getElementById('newarray').disabled = true;
    document.getElementById('sort-btn').disabled = true;
}

// Disables sort button only
function disableSortButton() {
    document.getElementById('sort-btn').disabled = true;
}

// Enables sort button only
function enableSortButton(){
    document.getElementById('sort-btn').disabled = false;
}


// Begins with an array displayed
regenerateArray(sizeSlider.value);