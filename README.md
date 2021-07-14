## A dummy SDK for Feature Flags

**Installation**

`npm install jazzy-elks-dummy-sdk` for the package.

**Usage**

```javascript
const SDK = require("jazzy-elks-dummy-sdk");
const config = new SDK("http://localhost:3030", "JazzyElksRule").connect().withWaitForData();
const sdkClient = config.client; // makes an active sse connection
console.log(sdkClient.get("Hi")); // gets feature
```


**Dev Log**
6/30/21
EventSource API does not allow custom headers, need one for "Authentication", could pass in using URL string but loggers might log it. Therefore used a polyfill, that allows for custom headers...

7/5/21
SDK should accept the entire ruleset for updates