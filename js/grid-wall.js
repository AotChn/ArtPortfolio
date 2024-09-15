
window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Select all the columns individually
    const column1 = document.querySelectorAll('.column-1');
    const column2 = document.querySelectorAll('.column-2');
    const column3 = document.querySelectorAll('.column-3');
    const column4 = document.querySelectorAll('.column-4');
    const column5 = document.querySelectorAll('.column-5');

    // Adjust scroll speed for each column
    const speed1 = -1;
    const speed2 = -0.25;
    const speed3 = -1;
    const speed4 = -0.25;
    const speed5 = -1;

    // Apply scroll transform to each image in the respective column
    column1.forEach((img) => {
        img.style.transform = `translateY(${scrollTop * speed1}px)`;
    });
    column2.forEach((img) => {
        img.style.transform = `translateY(${scrollTop * speed2}px)`;
    });
    column3.forEach((img) => {
        img.style.transform = `translateY(${scrollTop * speed3}px)`;
    });
    column4.forEach((img) => {
        img.style.transform = `translateY(${scrollTop * speed4}px)`;
    });
    column5.forEach((img) => {
        img.style.transform = `translateY(${scrollTop * speed5}px)`;
    });
});
