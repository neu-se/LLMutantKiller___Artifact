Your task is to write a test for the following function:
```
jsonfile.readFile(...args)
```

You may use the following examples to guide your implementation:
```
// usage #1
const jsonfile = require('jsonfile')const file = '/tmp/data.json'jsonfile.readFile(file, function (err, obj) {  if (err) console.error(err)  console.dir(obj)})
// usage #2
const jsonfile = require('jsonfile')const file = '/tmp/data.json'jsonfile.readFile(file)  .then(obj => console.dir(obj))  .catch(error => console.error(error))
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let jsonfile = require('jsonfile');
describe('test jsonfile', function() {
    it('test jsonfile.readFile', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.