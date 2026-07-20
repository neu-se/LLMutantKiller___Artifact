Your task is to write a test for the following function:
```
plural(word, num)
```

This function is defined as follows:
```
function plural(word, num) {
  var i
    , rule

  if (num !== 1 || num === undefined) {
    for (i = 0; i < rules.length; i++) {
      rule = rules[i]

      if (type(rule[0]) === 'RegExp' && rule[0].test(word)) {
        return type(rule[1]) === 'Function' ? rule[1](word, rule[0]) : rule[1]
      }
      if (type(rule[0]) === 'String' && rule[0] === word) {
        return type(rule[1]) === 'Function' ? rule[1](word) : rule[1]
      }

    }

    return word + 's'
  }
  return word
}
```

You may use the following examples to guide your implementation:
```
// usage #1
var plural = require('plural')console.log(plural('zebra', 1)) // returns singular 'zebra'console.log(plural('zebra', 2)) // returns 'zebras'console.log(plural('zebra')) // returns 'zebras' (if no parameters, always returns plural)
// usage #2
var plural = require('plural')plural.monkeyPatch()console.log('zebra'.plural(1))console.log('zebra'.plural(2))console.log('zebra'.plural())
// usage #3
'use strict';// create a new rule that converts any word ending// with 'p' and appends 'ius' to the wordvar plural = require('./index.js')plural.addRule(/p{1,2}$/i, function(w) { return w + 'ius' })console.log(plural('stop'))
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');
describe('test plural', function() {
    it('test plural', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.