V8 Debug Protocol
======================

A simple v8 debug client implementation

Install
----------------------

```bash
npm install --save v8-debug-protocol
```

How To Use
----------------------

Create a client:

```js
var Client = require('v8-debug-protocol')

// connect to remote port
var client = new Client(5858)

client.on('connect', function() {
  // nothing in this callback, just mark success
})
```
Send a `continue` request:

```js
// after connected
client.continue(function(err, doneOrNot) {

});

// other continue
var step = 10
client.continue.in(step, function(err, doneOrNot) {})
client.continue.out(step, function(err, doneOrNot) {})
client.continue.next(step, function(err, doneOrNot) {})
```

Handle `break` event from remote debugger:

```js
client.on('break', function(breakInfo) {
  console.log(breakInfo.script['some props'])
})
```

Get the `scripts` according to the script `id`

```js
var ScriptManager = Client.ScriptManager;

client.on('break', function(breakInfo) {
  (new ScriptManager(client)).getScript(breakInfo.scripts.id, function(err, scriptContent) {
    console.log(scriptContent)
  })
})
```

Manage BreakPoints

`list`
```js

var BreakPointManger = Client.BreakPointManger;

client.on('connect', function() {
  var bm = new BreakPointManager(client);
  bm.list()
    .then(function(breakpoints) {
      // all the brks
    })
});
```

`clear one`
```js
bm.list()
  .then(function(breakpoints) {
    return breakpoints[0].clear()
  })
```

`clear all`
```js
bm.clearAll()
  .then(fn, errFn)
```

`create a new breakpoint`
```js
bm.createBreakpoint('script.js', 10, 'condition === true')
  .then(function(breakpoint) {
    breakpoint.should.be.instanceOf(BreakPoint) // :p
  })
```

Todo
--------------------

..... don't know yet
