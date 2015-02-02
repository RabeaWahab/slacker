# Slacker
Small NodeJS module for talking to Slack's API methods https://api.slack.com/methods, still under development.

### Example:
Fill config file "config.js" with the needed credentials
        
```javascript
'domain' : '', //Your Slack domain: {sunny}.slack.com
'username': '',
'token': '' // Token that can be generated from https://api.slack.com/web
```

Example.js includes some commands as the below:
```javascript
slacker.channel_list();
slacker.message_post('C03H4BZPH', 'this is a test message', 'testuser', 'http://icons.iconarchive.com/icons/hopstarter/sleek-xp-software/256/Yahoo-Messenger-icon.png');
slacker.message_update('C03H4BZPH', '1422841482.000007', 'We can do that all day');
slacker.message_delete('C03H4BZPH', '1422841831.000010');
```     

### Please note:
This is work under development, any help is appreciated.