Alexa Skill Sample for RingCentral Lambda Function
==================================================

# Instructions

## Create a zip file with the following in this directory:

1. `cd` to this `src` directory
2. run `npm install`
3. Create a zip file with the following:
  1. `node_modules` directory
  2. `index.js` file
  3. `package.json` file

On OSX, using Finder you can select those files and directory and use the Compress feature to create a zip file.

## Upload to AWS Lambda function

1. Go to https://aws.amazon.com and create a Lambda `Blank Function`
2. Set your region to `US East (N. Virginia)` or `EU (Ireland)`
3. Click trigger icon, select `Alexa Skills Kit` and click `Next`
4. Set *Name* to `alexa-ringcentral-voicemail`
5. Set *Runtime* to `Node.js 4.3`
6. Under `Lambda function code` upload the zip file you made above and use the settings below before clicking `Next` and then `Create function` finish

Set your RingCentral SDK parameters using Lambda environment variables:

| Environment Variable | Description |
|----------------------|-------------|
| `RC_SERVER_URL` | RingCentral API server, e.g. `https://platform.ringcentral.com` |
| `RC_APP_KEY` | Your production or sandbox application key |
| `RC_APP_SECRET` | Your production or sandbox application secret |
| `RC_USERNAME` | Your RingCentral username |
| `RC_EXTENSION` | Your RingCentral extension |
| `RC_PASSWORD` | Your RingCentral password |

Lambda function handler and role, use the following settings:

| Property | Value |
|----------|-------|
| Handler | `index.handler` |
| Role | `Choose an existing role` |
| Existing role | `lambda_basic_execution` |
| Timeout | 0 min 10 sec |

Remember your ARN to paste into Developer.Amazon.com
