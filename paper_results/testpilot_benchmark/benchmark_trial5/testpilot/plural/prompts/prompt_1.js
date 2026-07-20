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