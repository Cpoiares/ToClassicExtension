This Extension was developed as a workaround the Salesforce Limitations of the “Switch to Salesforce Classic” functionality. As this is only an early version of the Extension, it’s still not supported on other browsers, but feel free to leave a note on different browsers you might want to see this implemented for.

When the “Switch to Salesforce Classic” link is clicked, the user gets prompted to the Home page as the system is not able to load the previous page in Classic Mode straight away.

Currently, these are the implemented functionality:

- Call Object Id in Classic:

- Call Job Administration Page in Classic;

- Call Configuration Data Management Page in Classic;

- Call Job List View Page in Classic;


As of now, the extension looks for one of the following link types:

Links where apex/ConfigurationDataManagement is included;

Links where apex/jobadministration is included;

Links where KimbleOne__Job__c is included;

Links where there is an alphanumerical ID (either 15 or 18 characters long) that doesn’t contain filters:

Filters are not represented in the same way from lighting and classic, this has to be approached in a different way after restructuring the whole extension. 

Keep this information in mind whenever the Extension behaves unexpectedly and feel free to mention any extra features that might be worth implementing.


## Installation
As the Extension has still to prove its worth, this “beta” version is only available on my Github Repository so you’ll have to download the unpacked version of the extension and use it in Developer mode.


### Steps:

1 - Download the source code from github.com/Cpoiares/ToClassicExtension
 
Once you’ve downloaded the ZIP file, extract it to the desired location.


2 - Add the Unpacked Extension to Chrome
Navigate to the following URL: chrome://extensions;

Toggle the “Developer Mode” option;

Click the Load unpacked button on the top left corner of the page;

Select the directory that contains the source code you’ve downloaded from the Github repository;

All set!

## User Guide
 
The Extension’s behavior is based on the URL from the focused tab when the Extension Icon was clicked, so to use it, simply click the Kimble Icon whenever you want to convert the page to Classic!

Notes
Please let me know if you find any bugs or needed corrections, that way I can perfect it to the team's needs.

(Any corrections or contributions to the Repo are welcomed    )
