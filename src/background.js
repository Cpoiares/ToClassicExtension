var switcher = '/ltng/switcher?destination=classic&referrer=%2Flightning%2Fpage%2Fhome';
var control = false;


// save tab where extension was called

chrome.browserAction.onClicked.addListener(function(tab) {    
    // URL = tab.url;
    control = false;
    if(tab.url.includes("lightning.force.com") || tab.url.includes(".visual.force.com"))
        parseURL(tab.url);

});


function parseURL(url)
{

    if(url.includes("apex/ConfigurationDataManagement")) // /apex/ConfigurationDataManagement
    {
        DealConfigMngmt(url);
    }
    else if(url.includes("apex/jobadministration")) // /apex/KimbleOne__jobadministration
    { 
        DealJobAdmin(url)
    }
    else
    {
        DealObjId(url);
    }
}

function DealObjId(url)
{

    var domain, anotha_url = '', split_url = null, str = '', obj_id = "Never Populated", aux;
    
    var regex = new RegExp("(?=.*)[/(a-zA-Z)+(0-9)+]{16,19}$");

    // Clear HTTPS://
    aux = url.split('://')[1];
    split_url = aux.split('/');
    domain = split_url[0];

    
    for (const str of split_url)
    {
        if(regex.test(str))
        {
            obj_id = str;
            break;
        }
    }

    if((obj_id == "Never Populated") || url.includes("?filter"))
    {
        //No id, Just change to Classic mode
        DealNoId(domain);
    }
    else
    {
        var newURL = "https://" + domain  + switcher;
    
        chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
            chrome.tabs.update(tab.id, {url: newURL});
        });
    
        // Using sleep to wait for page load
        //await new Promise(r => setTimeout(r, 10000));
    
        // On page load, getURL parse and call new classic URL + id
        chrome.webNavigation.onCompleted.addListener(function(details) {
            if(!control){
                chrome.tabs.query({currentWindow: true, active: true}, function (tab_2) {
                    control = true;
                    var aux = tab_2[0].url + '';
                    aux = aux.split("://")[1];
                    
                    anotha_url = "https://" + aux.split('/')[0] + '/' + obj_id;
                    //alert("Tab URL " + tab_2[0].url);
                    chrome.tabs.update(tab_2[0].id, {url: anotha_url});
                });
            }
        }, {
            url: [{
                // Runs on example.com, example.net, but also example.foo.com
                hostContains: '.salesforce.com'
            }],
        });
        
    }

}

function DealNoId(domain)
{
    var newURL = "https://" + domain  + switcher;

    chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
        chrome.tabs.update(tab.id, {url: newURL});
    });
}

function DealConfigMngmt(url)
{
    var domain, anotha_url = '', split_url = null, temp;

    // Clear HTTPS://
    temp = url.split('://')[1];
    split_url = temp.split('/');
    domain = split_url[0];

    var newURL = "https://" + domain  + switcher;
    //alert(newURL);

    chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
        chrome.tabs.update(tab.id, {url: newURL});
    });

    chrome.webNavigation.onCompleted.addListener(function(details) {
        if(!control){
            chrome.tabs.query({currentWindow: true, active: true}, function (tab_classic) {
                control = true;
                var temp = tab_classic[0].url + '';
                temp = temp.split("://")[1];
                anotha_url = "https://" + temp.split('/')[0] + '/' + "apex/KimbleOne__ConfigurationDataManagement";
                chrome.tabs.update(tab_classic[0].id, {url: anotha_url});
            });
        }
    }, {
        url: [{
            // Runs on example.com, example.net, but also example.foo.com
            hostContains: '.salesforce.com'
        }],
    });

}


function DealJobAdmin(url)
{

    var domain, classic_url = '', split_url = null, temp;

    // Clear HTTPS://
    temp = url.split('://')[1];
    split_url = temp.split('/');
    domain = split_url[0];

    var newURL = "https://" + domain  + switcher;
    //alert(newURL);

    chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
        chrome.tabs.update(tab.id, {url: newURL});
    });

    chrome.webNavigation.onCompleted.addListener(function(details) {
        if(!control){
            chrome.tabs.query({currentWindow: true, active: true}, function (tab_classic) {
                control = true;
                var temp = tab_classic[0].url + '';
                temp = temp.split("://")[1];
                classic_url = "https://" + temp.split('/')[0] + '/' + "apex/KimbleOne__jobadministration";
                chrome.tabs.update(tab_classic[0].id, {url: classic_url});
            });
        }
    }, {
        url: [{
            // Runs on example.com, example.net, but also example.foo.com
            hostContains: '.salesforce.com'
        }],
    });


}


function parseURL(url)
{

    if(url.includes("apex/ConfigurationDataManagement")) // /apex/ConfigurationDataManagement
    {
        DealConfigMngmt(url);
    }
    else if(url.includes("apex/jobadministration")) // /apex/KimbleOne__jobadministration
    { 
        DealJobAdmin(url)
    }
    else
    {
        DealObjId(url);
    }
}
