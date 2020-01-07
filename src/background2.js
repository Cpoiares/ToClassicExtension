var debug = false;
var switcher = '/ltng/switcher?destination=classic&referrer=%2Flightning%2Fpage%2Fhome';

chrome.browserAction.onClicked.addListener(function(tab) {    
    // URL = tab.url;
    if(debug)
        parseURL("https://kimble-lma.lightning.force.com/lightning/r/KimbleOne__Resource__c/a8k3A000000LWXuQAO/view");
    else
        parseURL(tab.url);
});




async function parseURL(url)
{
    var domain, anotha_url = '', split_url = null, str = '', obj_id = "Never Populated", control = false, aux;
    
    var regex = new RegExp("(?=.*)[(a-zA-Z)+(0-9)+]{15,19}$");

    alert("URL 1: " + url);
    // Clear HTTPS://
    aux = url.split('://')[1];

    alert("URL 2: " + aux);
    split_url = aux.split('/');

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
    var newURL = "https://" + domain  + switcher;
    alert(newURL);

    chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
        chrome.tabs.update(tab.id, {url: newURL});
    });


    await new Promise(r => setTimeout(r, 10000));

    chrome.tabs.query({currentWindow: true, active: true}, function (tab_2) {

        var aux = tab_2[0].url + '';
        aux = aux.split("://")[1];
        anotha_url = "https://" + aux.split('/')[0] + '/' + obj_id;
        alert("Tab URL " + tab_2[0].url);
        chrome.tabs.update(tab_2[0].id, {url: anotha_url});
    });


}
