var URL, domain, split_url = null, OBJ_ID, str = '', control = false, regex = new RegExp("(?=.*)[(a-z)+(0-9)+]{15,18}$");

chrome.browserAction.onClicked.addListener(function(tab) {    
    URL = tab.url;
    alert(URL);
    
    URL = URL + '';
    split_url = URL.split('/');
    domain = split_url[0];


    for (const str of split_url)
    {
        if(regex.test(str))
        {
            str = 'Found an ID : ' + str + '\n';
            OBJ_ID = str;
            control = true;
            break;
        }
    }

    if (control = false)
    {
        str = 'No ID found.\n';
    }
    
    if(str != null && str != '')
        alert(str);
    // Call Switcher
    // Get new URL
    // Call id 
});

function GET_NEW_URL(URL)
{

    var str = '';
    URL = URL + '';
    split_url = URL.split('/');
    domain = split_url[0];


    for (const str of split_url)
    {
        if(regex.test(str))
        {
            str = 'Found an ID : ' + str + '\n';
            OBJ_ID = str;
            control = true;
            break;
        }
    }

    if (control = false)
    {
        str = 'No ID found.\n';
    }

    return str;

}