Your task is to write a test for the following function:
```
plural.monkeyPatch()
```

This function is defined as follows:
```
function() {
  if (String.prototype.plural === undefined) {
    String.prototype.plural = function(num) {
      return plural(this, num)
    }
  }
  else {
    throw new Error('Unable to add plural function to String object')
  }
}
```

You may use the following examples to guide your implementation:
```
// usage #1
var plural = require('plural')plural.monkeyPatch()console.log('zebra'.plural(1))console.log('zebra'.plural(2))console.log('zebra'.plural())
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');
describe('test plural', function() {
    it('test plural.monkeyPatch', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.