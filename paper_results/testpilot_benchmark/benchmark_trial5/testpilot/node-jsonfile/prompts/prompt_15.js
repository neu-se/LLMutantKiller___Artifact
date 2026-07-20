Your task is to write a test for the following function:
```
jsonfile.writeFileSync(file, obj, options = {})
```

You may use the following examples to guide your implementation:
```
// usage #1
const jsonfile = require('jsonfile')const file = '/tmp/data.json'const obj = { name: 'JP' }jsonfile.writeFileSync(file, obj)
// usage #2
const jsonfile = require('jsonfile')const file = '/tmp/data.json'const obj = { name: 'JP' }jsonfile.writeFileSync(file, obj, { spaces: 2 })
// usage #3
const jsonfile = require('jsonfile')const file = '/tmp/data.json'const obj = { name: 'JP' }jsonfile.writeFileSync(file, obj, { spaces: 2, EOL: '\r\n' })
// usage #4
const jsonfile = require('jsonfile')const file = '/tmp/data.json'const obj = { name: 'JP' }jsonfile.writeFileSync(file, obj, { spaces: 2, finalEOL: false })
// usage #5
const jsonfile = require('jsonfile')const file = '/tmp/mayAlreadyExistedData.json'const obj = { name: 'JP' }jsonfile.writeFileSync(file, obj, { flag: 'a' })
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let jsonfile = require('jsonfile');
describe('test jsonfile', function() {
    it('test jsonfile.writeFileSync', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.