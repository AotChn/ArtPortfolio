window.addEventListener("load", function() {
    const loadingScreen = document.getElementById("loading-screen");
    
    // Check when all resources have loaded
    let actualLoadingTime = performance.now();
  
    const minimumLoadingTime = 3000; // Minimum 3 seconds
    const remainingTime = Math.max(0, minimumLoadingTime - actualLoadingTime);
  
    // Delay the removal based on actual load time
    setTimeout(() => {
      loadingScreen.classList.add("hidden");
      setTimeout(() => {
        document.getElementById("main-content").style.display = "block";
      }, 600); // Smooth fade-out
    }, remainingTime);
  });