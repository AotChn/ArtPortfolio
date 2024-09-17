window.addEventListener('load', () => {
    const bannerText = document.querySelector('.banner1-content');
    const bannerWidth = document.querySelector('.banner1').offsetWidth;
    textWidth = bannerText.scrollWidth;
  
    // Duplicate the text spans until they cover twice the width of the banner
    while (textWidth < bannerWidth * 2) {
      const newSpan = bannerText.firstElementChild.cloneNode(true);
      bannerText.appendChild(newSpan);
      textWidth = bannerText.scrollWidth;
    }
  
    // Adjust the animation duration
    const duration = (textWidth / bannerWidth) * 20; // Adjust 20s as needed
    bannerText.style.animationDuration = `${duration}s`;
  });
  