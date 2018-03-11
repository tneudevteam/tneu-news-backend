import {captureAWS, captureHTTPsGlobal} from 'aws-xray-sdk-core';

if (process.env._AWS_XRAY_DAEMON_ADDRESS) {
  captureHTTPsGlobal(require('http'));
  captureHTTPsGlobal(require('https'));
}
