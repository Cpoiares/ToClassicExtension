/* TODO: https://westmonroepartners.lightning.force.com/one/one.app#eyJjb21wb25lbnREZWYiOiJvbmU6YWxvaGFQYWdlIiwiYXR0cmlidXRlcyI6eyJhZGRyZXNzIjoiaHR0cHM6Ly93ZXN0bW9ucm9lcGFydG5lcnMubGlnaHRuaW5nLmZvcmNlLmNvbS9hcGV4L0tpbWJsZU9uZV9fQWN0aXZpdHlBc3NpZ25tZW50c0RlbGl2ZXJ5P2ZpbHRlcmlkPWE2d2YyMDAwMDAxNUdHbEFBTSZpZD1hNDlmMjAwMDAwMHB3WmdBQUkifSwic3RhdGUiOnt9fQ%3D%3D
        switch to classic in new tab
        open same page in new window

    TODO: Correct Job Page 
    if link: https://boardcrm.lightning.force.com/lightning/r/KimbleOne__Job__c/a1a0J0000069c3GQAQ/view
    Calls page list view instead of ID

*/
const switcher = '/ltng/switcher?destination=classic&referrer=%2Flightning%2Fpage%2Fhome';
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
        DealJobAdmin(url);
    }
    /*else if(url.includes("KimbleAgent_AgentDashboard"))
    {
        DealAgentDashboard(url);
    }    */
    else if(url.includes("KimbleOne__Job__c"))
    {
        DealJobPage(url);
    }

    else
    {
        DealObjId(url);
    }
}


function DealObjId(url)
{

    var domain, lightning_url = '', split_url = null, str = '', obj_id = "Never Populated", aux;
    
    // Need to Correc Regex because 
    // https://boardcrm.lightning.force.com/one/one.app#eyJjb21wb25lbnREZWYiOiJvbmU6YWxvaGFQYWdlIiwiYXR0cmlidXRlcyI6eyJhZGRyZXNzIjoiaHR0cHM6Ly9ib2FyZGNybS5saWdodG5pbmcuZm9yY2UuY29tL2FwZXgvS2ltYmxlT25lX19BY3Rpdml0eUFzc2lnbm1lbnRzRGVsaXZlcnk%2FZmlsdGVyaWQ9YTJ0MEowMDAwMDJBMkdKUUEwJmlkPWEwdDBKMDAwMDBFMnBVbFFBSiJ9LCJzdGF0ZSI6e319
    // is picked up 
    const regex = new RegExp("(?=.*)[/(a-zA-Z)+(0-9)+]{16,19}$");

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
                    
                    lightning_url = "https://" + aux.split('/')[0] + '/' + obj_id;
                    //alert("Tab URL " + tab_2[0].url);
                    chrome.tabs.update(tab_2[0].id, {url: lightning_url});
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
    var domain, lightning_url = '', split_url = null, temp;

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
                lightning_url = "https://" + temp.split('/')[0] + "/apex/KimbleOne__ConfigurationDataManagement";
                chrome.tabs.update(tab_classic[0].id, {url: lightning_url});
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
                classic_url = "https://" + temp.split('/')[0] + "/apex/KimbleOne__jobadministration";
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

//https://kimbleagent.um5.visual.force.com/apex/AgentDashboard?sfdc.tabName=01r1t000000vYhv

function DealAgentDashboard()
{
    var domain, classic_url = '', split_url = null, temp, prefix = "kimbleagent.";

    // Clear HTTPS://
    temp = url.split('://')[1];
    split_url = temp.split('/');
    domain = split_url[0];

    var newURL = "https://" + domain  + switcher;
    //alert(newURL);

    chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
        chrome.tabs.update(tab.id, {url: newURL});
    });

    // Page is vsforce, need to split url by the '.' get the node and build url in form https://kimbleagent.node.visual.force.com/apex/AgentDashboard
    chrome.webNavigation.onCompleted.addListener(function(details) {
        if(!control){
            chrome.tabs.query({currentWindow: true, active: true}, function (tab_classic) {
                control = true;
                var temp = tab_classic[0].url + '';
                temp = temp.split("://")[1];
                classic_url = "https://" + prefix + temp.split('/')[0] + "/apex/KimbleOne__jobadministration";
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

function DealJobPage(url)
{
   // Classic argument for job page /apex/KimbleOne__ObjectLinks?f=KimbleOne__Job__C

   var domain, classic_url = '', split_url = null, temp, obj_id = "Never Populated";
   const regex = new RegExp("(?=.*)[/(a-zA-Z)+(0-9)+]{16,19}$");

   // Clear HTTPS://
   temp = url.split('://')[1];
   split_url = temp.split('/');
   domain = split_url[0];

   var newURL = "https://" + domain  + switcher;
   //alert(newURL);

   for (const str of split_url)
   {
       if(regex.test(str))
       {
           obj_id = str;
           break;
       }
   }

   if(obj_id != "Never Populated")
   {
       DealObjId(url);
   }
   else
   {
    chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
        chrome.tabs.update(tab.id, {url: newURL});
    });
 
    // Page is vsforce, need to split url by the '.' get the node and build url in form https://kimbleagent.node.visual.force.com/apex/AgentDashboard
    chrome.webNavigation.onCompleted.addListener(function(details) {
        if(!control){
            chrome.tabs.query({currentWindow: true, active: true}, function (tab_classic) {
                control = true;
                var temp = tab_classic[0].url + '';
                temp = temp.split("://")[1];
                classic_url = "https://" + temp.split('/')[0] + "/apex/KimbleOne__ObjectLinks?f=KimbleOne__Job__C";
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

}


