"use strict";

var request 	= require('request');
var querystring = require('querystring');
var config 		= require('./config');

var Slack = function(){
	this.domain 		=  config.domain;
	this.username 		=  config.username;
	this.token 			=  config.token;
	this.url 			= 'https://slack.com/api/';
	this.pretty 		= '1';
};

/**
* A generic method to handle GET requests to the Slack API
*/

Slack.prototype.get = function(end_point, parameters, pretty){
	var requestToken 	= this.token;
	var url  			= this.url;
	parameters.token 	= requestToken; 

	if(!pretty || pretty == 0){
		parameters.pretty = 0;
	}

	parameters 		= querystring.stringify(parameters);
	url = url + end_point + '?' + parameters;
	console.log(url);
	var option 			= {url:   url};

  	var req = request.get(option, function(err, res) {
  		if(err){
  			return false;
  		}

		if(res.body){
			var body = JSON.parse(res.body);
			if(body.ok == false){
				console.log(body.error + ' check URL for more details on the error: https://api.slack.com/methods/'+end_point);
			} else {
				console.log(body);
			}
		}

		return false;
  	});
};

/**
* Channels methods as documented in https://api.slack.com/methods
*/

Slack.prototype.channel_list = function(exclude_archived){
	if(exclude_archived){
		exclude_archived = 1;
	} else {
		exclude_archived = 0;
	}

	this.get(
			'channels.list', 
			{exclude_archived: exclude_archived}
		);
	return;
};

Slack.prototype.channel_id = function(channel_name){
	var channels = this.channel_list();
	console.log(channels);
};

Slack.prototype.channel_create = function(name){
	this.get(
			'channels.create', 
			{name: name}
		);
	return;
};

Slack.prototype.channel_history = function(channel_id, latest_timestamp, oldest_timestamp, message_count){
	var latest 			= 'now';
	var oldest 			= '0';
	var count 			= 100; 

	if(!channel_id){
		console.log('Channel ID is required');
		return;
	}

	if(!latest_timestamp){
		latest = latest_timestamp;
	}

	if(!oldest_timestamp){
		oldest = oldest_timestamp;
	}

	if(message_count && message_count > 0){
		count = message_count;
	}

	this.get(
			'channels.create', 
			{channel: channel_id, latest: latest, oldest: oldest, count: count}
		);
	return;
};

/**
* Messages methods as in https://api.slack.com/methods
* (Implementation of the opt1422841831.000010ional parameters in the future)
*/

Slack.prototype.message_post = function(channel_id, text, username, icon_url){
	if(!channel_id){
		console.log('Channel ID is required');
		return;
	}

	if(!text){
		console.log('Message text is required');
		return;
	}

	var user = this.username;
	if(username){
		var user = username;
	}

	this.get(
			'chat.postMessage',
			{channel: channel_id, text: text, username: username, icon_url: icon_url}
		);
	return;	
};

Slack.prototype.message_update = function(channel_id, timestamp, text){
	if(!channel_id){
		console.log('Channel ID is required');
		return;
	}

	if(!text){
		console.log('Message text is required');
		return;
	}

	if(!timestamp){
		console.log('Timestamp is required');
		return;
	}

	this.get(
			'chat.update',
			{channel: channel_id, text: text, ts: timestamp}
		);
	return;	
};

Slack.prototype.message_delete = function(channel_id, timestamp){
	if(!channel_id){
		console.log('Channel ID is required');
		return;
	}

	if(!timestamp){
		console.log('Timestamp is required');
		return;
	}

	this.get(
			'chat.delete',
			{channel: channel_id, ts: timestamp}
		);
	return;	
};

var slack = new Slack();
module.exports = slack;