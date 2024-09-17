function moveX(element, times, dir, time) {
    const elementWidth = element.offsetWidth;
    const moveDistance = elementWidth * times;
    element.style.transition = `transform ${time}s ease`;
    element.style.transform = `translateX(${dir * moveDistance}px)`
}

function moveY(element, times, dir, time) {
    const elementWidth = element.offsetWidth;
    const moveDistance = elementWidth * times;
    element.style.transition = `transform ${time}s ease`;
    element.style.transform = `translateY(${dir * moveDistance}px)`
}

function scaleX(element, s, time) {
    element.style.transition = `transform ${time}s ease`;
    element.style.transform = `scaleX(${s})`;
}

function scaleY(element, s, time) {
    element.style.transition = `transform ${time}s ease`;
    element.style.transform = `scaleY(${s})`;
}

/*  
    fold state: 1 = folded, 0 = unfolded
    scale state: 1 = scaled, 0 = unscaled
    to collapse and uncollapse we want the values opposite of each other
*/
function fold(container, itemName, filter, foldState, foldTime, scaleState, scaleTime, move, scale) {
    const items = document.querySelectorAll("." + container + " ." + itemName);
    const mid = items.length/2;
    let filtered = [];
    let ogIndex = [];
    counter = 0;
    items.forEach((item, index) => { //filter out unwanted items
        const id = item.id;
        if (id != filter) {
            filtered.push(item);
            ogIndex.push(index);
        } else {
            scale(item, scaleState, scaleTime);
        }
    });
    
    const midIndex = (filtered.length/2);
    filtered.forEach((item, index) => { //filter out unwanted items
        gap = Math.abs(index - midIndex);
        dist = mid - ogIndex[index];
        console.log(`index: ${index} midIndex:${midIndex} mid:${mid} gap:${gap} dis:${dist}`)
        if(index < midIndex) {
            console.log("less");
            dist = dist - gap;
        }
        else if(index >= midIndex) {
            console.log("greater");
            dist = dist + gap;
        }
        move(item, dist, foldState, foldTime);
    });
    
}

/*
    works on a container div with some items
    keeps all non filter ids and squeezes all filter ids
*/
function foldAnimate(container, secondary, itemName, filter, foldTime=2, scaleTime=1, move=moveX, scale=scaleY) {
    const textElement = document.getElementById(secondary);

    textElement.addEventListener('mouseover', function() {
        console.log("hover");
        fold(container, itemName, filter, 1, foldTime, 0, scaleTime, move, scale);
    });

    textElement.addEventListener('mouseout', function() {
        console.log("Nothover");
        fold(container, itemName, filter, 0, foldTime, 1, scaleTime, move, scale);
    });
}


foldAnimate("logo", "logo-button", "text", "hide", .4, 0.2);
// foldAnimate("container","animateText", "text", "hide", 1, .5);

