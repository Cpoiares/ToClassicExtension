// Grab url
// Store ID in URL (if possible ???)
// Removed     "default_popup": "background.html"
// javascript:var path='/ltng/switcher?destination=classic&referrer=%2Flightning%2Fpage%2Fhome';window.open(URL + path);
// Call Switcher 
// Grab New URL 
// Add Stored ID
// Call New URL

var DEBUG = false;
var URL, domain, split_url = null, OBJ_ID, control = false, regex = new RegExp("(?=.*)[(a-z)+(0-9)+]{15,18}$");
var switcher = '/ltng/switcher?destination=classic&referrer=%2Flightning%2Fpage%2Fhome';
chrome.browserAction.onClicked.addListener(function(tab) { alert('icon clicked')});



if(DEBUG)
{
    URL = "www.google.com/asd/asdsd/aasd12345678911"

}
else{

    var s = document.createElement('script');
    s.src = chrome.extension.getURL('src/backgroundCall.js');
    (document.head || document.documentElement).appendChild(s);
    
    s.onload = function(){
    
        console.log("PAGE LOADED.")
        var url=chrome.runtime.getURL("/html/background.html") + '';
        
        var evt=document.createEvent("CustomEvent");
        evt.initCustomEvent("yourCustomEvent", true, true, url);
        document.dispatchEvent(evt);
        console.log("EVENT DISPATCHED");
        URL = url + '';
    };
}
if(URL != null){
    console.log(URL);
    URL = URL + '';
    split_url = URL.split('/');
    domain = split_url[0];


    for (const str of split_url)
    {
        console.log(str);
        if(regex.test(str))
        {
            console.log('Found an ID : ' + str + '\n');
            OBJ_ID = str;
            control = true;
            break;
        }
    }

    if (control = false)
    {
        console.log('No ID found.\n')
    }

    var newURL = domain + switcher;
    chrome.browserAction.onClicked.addListener(function(activeTab)
    {
    chrome.tabs.create({url : newURL});  
    });

    // wait for page to load, grab domain, call new URL with ID
}
else
{
    console.log("URL == NULL");
}