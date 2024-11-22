if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    });
  }
  
const content = document.getElementById("content");

let touchStart = 0;
let isRefreshing = false;

content.addEventListener("touchstart", (e) => {
  touchStart = e.touches[0].clientY;
});

content.addEventListener("touchmove", (e) => {
  if (touchStart > e.touches[0].clientY && content.scrollTop === 0) {
    // We're pulling down from the top
    if (!isRefreshing) {
      showRefreshIndicator();
    }
  }
});

content.addEventListener("touchend", (e) => {
  if (touchStart > e.changedTouches[0].clientY && content.scrollTop === 0) {
    if (!isRefreshing) {
      isRefreshing = true;
      triggerRefresh();
    }
  }
});

function showRefreshIndicator() {
  // You can add a loading spinner or any indicator here.
  console.log("Pull down to refresh");
}

function triggerRefresh() {
  // Trigger the refresh action, like reloading data or content
  console.log("Refreshing content...");

  // Simulate a network request or reload process
  setTimeout(() => {
    isRefreshing = false;
    content.innerHTML = "<p>Content has been refreshed.</p>";
  }, 2000); // Example delay
}
