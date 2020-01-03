// Inform the background page that 
// this tab should have a page-action.

document.getElementById("btn").addEventListener("click",
    function() {
  window.postMessage({ type: "FROM_PAGE", text: "Hello from the webpage!" }, "*");
}, false);