/*
    TODO: Context menu for right click call ID, Decode Parameter and Open Ids
*/
const switcher = '/ltng/switcher?destination=classic&referrer=%2Flightning%2Fpage%2Fhome';
var control = false, debug = false, test = 'https://claremont.lightning.force.com/one/one.app?source=alohaHeader#eyJjb21wb25lbnREZWYiOiJvbmU6YWxvaGFQYWdlIiwiYXR0cmlidXRlcyI6eyJhZGRyZXNzIjoiaHR0cHM6Ly9jbGFyZW1vbnQubGlnaHRuaW5nLmZvcmNlLmNvbS9hcGV4L0tpbWJsZU9uZV9fQWN0aXZpdHlBc3NpZ25tZW50c0RlbGl2ZXJ5P2lkPWEwYzN6MDAwMDBabVdUdEFBTiJ9LCJzdGF0ZSI6e319';


chrome.browserAction.onClicked.addListener(function (tab) {
    control = false;
    if(debug)
        CheckType(test);
    else
    {
        if (tab.url.includes("lightning.force.com") || tab.url.includes(".visual.force.com"))
            CheckType(tab.url);
    }
});

function Parser(url) {

    var aux, split_url;
    aux = url.split('://')[1];
    split_url = aux.split('/');
    return split_url;
}

function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

function CheckType(url) {

    if (url.includes("apex/ConfigurationDataManagement")) // /apex/ConfigurationDataManagement
    {
        DealConfigMngmt(url);
    }
    else if (url.includes("apex/jobadministration")) // /apex/KimbleOne__jobadministration
    {
        DealJobAdmin(url);
    }
    else if (url.includes("/one/one.app")) {
        DealWithOneApp(url);
    }
    else if (url.includes("KimbleOne__Job__c")) {
        DealJobPage(url);
    }

    else {
        DealObjId(url);
    }
}

function DealWithOneApp(url) {

    var domain, split_url = null, dec, decoded_url = decodeURIComponent(url), json_obj;
    split_url = Parser(decoded_url);

    domain = split_url[0];

    id_dec = decoded_url.split('#')[1];
    alert("Calling the following id to decode " + id_dec)
    decoded_str = b64DecodeUnicode(id_dec);

    try
    {
        json_obj = JSON.parse(decoded_str);
        var newURL = "https://" + domain + switcher;
        alert("Address: " + json_obj.attributes.address);

        alert("");

        chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
            chrome.tabs.update(tab.id, { url: newURL });
        });

        chrome.webNavigation.onCompleted.addListener(function (details) {
            chrome.tabs.query({ currentWindow: true, active: true }, function (tab_2) {
                if(!control){
                    control = true;
                    chrome.tabs.update(tab_2[0].id, { url: json_obj.attributes.address});
                }
            });
            
        }, {
            url: [{
                hostContains: '.salesforce.com'
            }],
        });
    }catch(e)
    {
        alert("Exception caught");
        DealNoId(domain);
    }


}


function DealObjId(url) {

    var domain, lightning_url = '', split_url = null, obj_id = "Never Populated";
    const regex = new RegExp("(?=.*)^[/(a-zA-Z)+(0-9)+]{16,19}$");
    
    split_url = Parser(url);
    domain = split_url[0];


    for (const str of split_url) {
        if (regex.test(str)) {
            obj_id = str;
            break;
        }
    }

    if ((obj_id == "Never Populated") || url.includes("?filter")) {
        DealNoId(domain);
    }
    else {
        var newURL = "https://" + domain + switcher;

        chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
            chrome.tabs.update(tab.id, { url: newURL });
        });

        chrome.webNavigation.onCompleted.addListener(function (details) {
            if (!control) {
                chrome.tabs.query({ currentWindow: true, active: true }, function (tab_2) {
                    control = true;
                    var aux = tab_2[0].url + '';
                    aux = aux.split("://")[1];

                    lightning_url = "https://" + aux.split('/')[0] + '/' + obj_id;
                    chrome.tabs.update(tab_2[0].id, { url: lightning_url });
                });
            }
        }, {
            url: [{
                hostContains: '.salesforce.com'
            }],
        });

    }

}

function DealNoId(domain) {
    var newURL = "https://" + domain + switcher;

    chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
        chrome.tabs.update(tab.id, { url: newURL });
    });
}

function DealConfigMngmt(url) {
    var domain, lightning_url = '', split_url = null, temp;
    split_url = Parser(url);
    domain = split_url[0];

    var newURL = "https://" + domain + switcher;

    chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
        chrome.tabs.update(tab.id, { url: newURL });
    });

    chrome.webNavigation.onCompleted.addListener(function (details) {
        if (!control) {
            chrome.tabs.query({ currentWindow: true, active: true }, function (tab_classic) {
                control = true;
                var temp = tab_classic[0].url + '';
                temp = temp.split("://")[1];
                lightning_url = "https://" + temp.split('/')[0] + "/apex/KimbleOne__ConfigurationDataManagement";
                chrome.tabs.update(tab_classic[0].id, { url: lightning_url });
            });
        }
    }, {
        url: [{
            hostContains: '.salesforce.com'
        }],
    });

}


function DealJobAdmin(url) {

    var domain, classic_url = '', split_url = null;

    split_url = Parser(url);
    domain = split_url[0];

    var newURL = "https://" + domain + switcher;

    chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
        chrome.tabs.update(tab.id, { url: newURL });
    });

    chrome.webNavigation.onCompleted.addListener(function (details) {
        if (!control) {
            chrome.tabs.query({ currentWindow: true, active: true }, function (tab_classic) {
                control = true;
                var temp = tab_classic[0].url + '';
                temp = temp.split("://")[1];
                classic_url = "https://" + temp.split('/')[0] + "/apex/KimbleOne__jobadministration";
                chrome.tabs.update(tab_classic[0].id, { url: classic_url });
            });
        }
    }, {
        url: [{
            hostContains: '.salesforce.com'
        }],
    });


}


function DealAgentDashboard() {
    var domain, classic_url = '', split_url = null, temp, prefix = "kimbleagent.";

    split_url = Parser(url);
    domain = split_url[0];

    var newURL = "https://" + domain + switcher;
    chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
        chrome.tabs.update(tab.id, { url: newURL });
    });

    chrome.webNavigation.onCompleted.addListener(function (details) {
        if (!control) {
            chrome.tabs.query({ currentWindow: true, active: true }, function (tab_classic) {
                control = true;
                var temp = tab_classic[0].url + '';
                temp = temp.split("://")[1];
                classic_url = "https://" + prefix + temp.split('/')[0] + "/apex/KimbleOne__jobadministration";
                chrome.tabs.update(tab_classic[0].id, { url: classic_url });
            });
        }
    }, {
        url: [{
            hostContains: '.salesforce.com'
        }],
    });
}

function DealJobPage(url) {

    var domain, classic_url = '', split_url = null, obj_id = "Never Populated";
    const regex = new RegExp("(?=.*)[/(a-zA-Z)+(0-9)+]{16,19}$");

    split_url = Parser(url);
    domain = split_url[0];

    var newURL = "https://" + domain + switcher;

    for (const str of split_url) {
        if (regex.test(str)) {
            obj_id = str;
            break;
        }
    }

    if (obj_id != "Never Populated") {
        DealObjId(url);
    }
    else {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
            chrome.tabs.update(tab.id, { url: newURL });
        });

        chrome.webNavigation.onCompleted.addListener(function (details) {
            if (!control) {
                chrome.tabs.query({ currentWindow: true, active: true }, function (tab_classic) {
                    control = true;
                    var temp = tab_classic[0].url + '';
                    temp = temp.split("://")[1];
                    classic_url = "https://" + temp.split('/')[0] + "/apex/KimbleOne__ObjectLinks?f=KimbleOne__Job__C";
                    chrome.tabs.update(tab_classic[0].id, { url: classic_url });
                });
            }
        }, {
            url: [{
                hostContains: '.salesforce.com'
            }],
        });

    }

}


