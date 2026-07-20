Your task is to write a test for the following function:
```
plural.addRule(match, result)
```

This function is defined as follows:
```
function addRule(match, result) {
  rules.unshift([match, result])
  return plural
}
```

You may use the following examples to guide your implementation:
```
// usage #1
'use strict';// create a new rule that converts any word ending// with 'p' and appends 'ius' to the wordvar plural = require('./index.js')plural.addRule(/p{1,2}$/i, function(w) { return w + 'ius' })console.log(plural('stop'))
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');
describe('test plural', function() {
    it('test plural.addRule', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.