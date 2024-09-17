const items = document.querySelectorAll("." + container + " ." + itemName);
const mid = items.length/2;
let filtered = [];
counter = 0;
items.forEach((item) => { //filter out unwanted items
    const id = item.id;
    if (id != filter) {
        filtered.push(item);
    } else {
        scale(item, scaleState, scaleTime);
    }
});

const midIndex = (filtered.length/2);
filtered.forEach((item, index) => { //filter out unwanted items
    gap = Math.abs(index - midIndex);
    dist = mid - index;
    if(index < midIndex) {
        dist = dist - gap;
    }
    else if(index > midIndex) {
        dist = dist + gap;
    }
    move(item, dist, foldState, foldTime);
});
