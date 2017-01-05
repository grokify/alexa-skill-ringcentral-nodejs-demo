Alexa Skill Sample for RingCentral using Node.js
================================================

This is a small demo to show how to call the RingCentral API using an Alexa skill.

The directions here are very high level instructions on how to create an Alexa skill and Lambda function. For more detailed directions, see the [Alexa fact sample skill repo](https://github.com/alexa/skill-sample-nodejs-fact).

## Synopsis

The following are sample commands that Alexa can respond to for this demo.

```
Alexa ask RingCentral to check my voicemail
```

## Configuration

### Create the Alexa Skill

1. Log into [https://developer.amazon.com/](https://developer.amazon.com/)
2. Click the `Alexa` menu bar item and then click the `Add a New Skill` button
3. For *Skill Information*
  1. Leave Skill Type set to `Custom Interaction Model`
  2. Type your *Name*, e.g. `RingCentral Voicemail`
  3. Type your *Invocation Name*, e.g. `ringcentral`
  4. Click `Next`
4. For *Interaction Model*
  1. For *Intent Schema* copy content from `speech-assets/intent-schema.json`
  2. For *Sample Utterances* copy content from `speech-assets/utterances_en_US.txt`
5. For *Configuration*
  1. Create an AWS Lambda function by following the instructions in [`src/README.md`](src/README.md)

## Test Alexa Skill

In the Service Simulator, type `check voicemail` and then click the `Ask RingCentral Voicemail` button.

You should see something like the following:

### Lambda Request

```js
{
  "session": {
    "sessionId": "SessionId.11110000-3333-4444-5555-666677778888",
    "application": {
      "applicationId": "amzn1.ask.skill.22220000-3333-4444-5555-666677778888"
    },
    "attributes": {},
    "user": {
      "userId": "amzn1.ask.account.DEADBEEF"
    },
    "new": true
  },
  "request": {
    "type": "IntentRequest",
    "requestId": "EdwRequestId.33330000-3333-4444-5555-666677778888",
    "locale": "en-US",
    "timestamp": "2017-01-05T05:50:46Z",
    "intent": {
      "name": "RingCentralGetNewVoicemailCountIntent",
      "slots": {}
    }
  },
  "version": "1.0"
}
```

### Lambda Response

```js
{
  "version": "1.0",
  "response": {
    "outputSpeech": {
      "type": "SSML",
      "ssml": "<speak> You have 3 voicemails </speak>"
    },
    "shouldEndSession": true
  },
  "sessionAttributes": {}
}
```

## Test on device

You can test on your actual physical Alexa device (e.g. Amazon Echo, Dot, etc.) or on the virtual [Echosim.io device](https://echosim.io) using the information below:

* [Testing a Custom Skill](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/testing-an-alexa-skill)
* [Echosim.io](https://echosim.io/)

## Additional Links

* [Alexa fact sample skill](https://github.com/alexa/skill-sample-nodejs-fact)
* [Audio file playback error](https://forums.developer.amazon.com/questions/5915/error-playing-audio-file-from-s3-in-alexa-skill.html)
