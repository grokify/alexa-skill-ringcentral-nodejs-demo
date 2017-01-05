'use strict';
var Alexa = require('alexa-sdk');
var APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

var RCSDK = require('ringcentral');
var rcsdk = new RCSDK({
    server: process.env.RC_SERVER_URL,
    appKey: process.env.RC_APP_KEY,
    appSecret: process.env.RC_APP_SECRET,
});
var VOICEMAIL_MONTHS = 1

var rc_username = process.env.RC_USERNAME;
var rc_extension = process.env.RC_EXTENSION;
var rc_password = process.env.RC_PASSWORD;

var languageStrings = {
    "en-GB": {
        "translation": {
            "HELP_MESSAGE" : "You can say tell me a space fact, or, you can say exit... What can I help you with?",
            "HELP_REPROMPT" : "What can I help you with?",
            "STOP_MESSAGE" : "Goodbye!"
        }
    },
    "en-US": {
        "translation": {
            "HELP_MESSAGE" : "You can say tell me a space fact, or, you can say exit... What can I help you with?",
            "HELP_REPROMPT" : "What can I help you with?",
            "STOP_MESSAGE" : "Goodbye!"
        }
    },
    "de-DE": {
        "translation": {
            "HELP_MESSAGE" : "Du kannst sagen, „Nenne mir einen Fakt über den Weltraum“, oder du kannst „Beenden“ sagen... Wie kann ich dir helfen?",
            "HELP_REPROMPT" : "Wie kann ich dir helfen?",
            "STOP_MESSAGE" : "Auf Wiedersehen!"
        }
    }
};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {},
    'RingCentralGetNewVoicemailCountIntent': function () {
        var a = this;
        rcsdk.platform()
            .login({
                username: rc_username,
                extension: rc_extension,
                password: rc_password,
                refreshTokenTtl: -1
            })
            .then(function(response) {
                var dateFrom = new Date();
                dateFrom.setMonth(dateFrom.getMonth() - VOICEMAIL_MONTHS);
                rcsdk.platform()
                    .send({
                        method: 'GET',
                        url: '/account/~/extension/~/message-store',
                        query: {
                            dateFrom: dateFrom.toISOString(),
                            direction: 'Inbound',
                            messageType: 'VoiceMail',
                            readStatus: 'Unread',
                            perPage: 1000
                        }
                    })
                    .then(function(apiResponse){
                        var count = apiResponse.json().paging.totalElements;
                        a.emit(':tell', 'You have ' + count.toString() + ' voicemails');
                    })
                    .catch(function(e){
                        a.emit(':tell', 'I cannot find how many voicemails you have right now');
                    });
            })
            .catch(function(e) {
                a.emit(':tell', 'I cannot connect to your RingCentral account right now');
            });
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = this.t("HELP_MESSAGE");
        var reprompt = this.t("HELP_MESSAGE");
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    }
};