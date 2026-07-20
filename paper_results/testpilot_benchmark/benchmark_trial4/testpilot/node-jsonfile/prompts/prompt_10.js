Your task is to write a test for the following function:
```
jsonfile.writeFile(...args)
```

This function is defined as follows:
```
function (...args) {
    const cb = args[args.length - 1]
    if (typeof cb !== 'function') return fn.apply(this, args)
    else {
      args.pop()
      fn.apply(this, args).then(r => cb(null, r), cb)
    }
  }
```

You may use the following examples to guide your implementation:
```
// usage #1
const jsonfile = require('jsonfile')const file = '/tmp/data.json'const obj = { name: 'JP' }jsonfile.writeFile(file, obj, function (err) {  if (err) console.error(err)})
// usage #2
const jsonfile = require('jsonfile')const file = '/tmp/data.json'const obj = { name: 'JP' }jsonfile.writeFile(file, obj)  .then(res => {    console.log('Write complete')  })  .catch(error => console.error(error))
// usage #3
const jsonfile = require('jsonfile')const file = '/tmp/data.json'const obj = { name: 'JP' }jsonfile.writeFile(file, obj, { spaces: 2 }, function (err) {  if (err) console.error(err)})
// usage #4
const jsonfile = require('jsonfile')const file = '/tmp/data.json'const obj = { name: 'JP' }jsonfile.writeFile(file, obj, { spaces: 2, EOL: '\r\n' }, function (err) {  if (err) console.error(err)})
// usage #5
const jsonfile = require('jsonfile')const file = '/tmp/data.json'const obj = { name: 'JP' }jsonfile.writeFile(file, obj, { spaces: 2, finalEOL: false }, function (err) {  if (err) console.log(err)})
// usage #6
const jsonfile = require('jsonfile')const file = '/tmp/mayAlreadyExistedData.json'const obj = { name: 'JP' }jsonfile.writeFile(file, obj, { flag: 'a' }, function (err) {  if (err) console.error(err)})
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let jsonfile = require('jsonfile');
describe('test jsonfile', function() {
    it('test jsonfile.writeFile', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.