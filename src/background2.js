var debug = true;
var switcher = '/ltng/switcher?destination=classic&referrer=%2Flightning%2Fpage%2Fhome';

chrome.browserAction.onClicked.addListener(function(tab) {    
    // URL = tab.url;
    if(debug)
        parseURL("www.google.com/asd/asdsd/aasd12345678911");
    else
        parseURL(tabs.url);
});

function parseURL(url)
{
    var domain, split_url = null, str = '', obj_id = "Never Populated", control = false;
    var regex = new RegExp("(?=.*)[(a-z)+(0-9)+]{15,18}$");

    split_url = url.split('/');
    domain = split_url[0];

    
    for (const str of split_url)
    {
        if(regex.test(str))
        {
            obj_id = str;
            control = true;
            break;
        }
    }

    if (control = false)
    {
        obj_id = 'No ID found.\n';
    }

    alert("Domain: " + domain + "\nObject ID found: " + obj_id + "\n");
    var newURL = domain + '/' + switcher;
    alert(newURL);
    window.location.href = newURL;
    
    chrome.tabs.create({url: newURL});

    // New url gets appended chrome-extension://id/
    

}
