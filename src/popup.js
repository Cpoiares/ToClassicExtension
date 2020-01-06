// Inform the background page that 
// this tab should have a page-action.
var element = document.getElementById("hidden");
if(element){
  element.addEventListener("CustomEvent",
  function(e) {
    console.log('FROM HTML - Preparing Response\n')
    element.dispatchEvent(new CustomEvent('CustomResponse', {
      detail: {
        type: 'HTML_RESPONSE',
        text: document.URL.toString()
      }
    }));
  }, false);  
}
