Your task is to write a test for the following function:
```
pull-stream.log(done)
```

You may use the following examples to guide your implementation:
```
// usage #1
pull(  pull.values(['file1', 'file2', 'file3']),  pull.asyncMap(fs.stat),  pull.collect(function (err, array) {    console.log(array)  }))
// usage #2
// logger reads a source and logs it.function logger (read) {  read(null, function next(end, data) {    if(end === true) return    if(end) throw end    console.log(data)    read(null, next)  })}
// usage #3
pull(  values([0, 1, 2, 3]),  map(function (x) {    return x * x  }),  log())// 0// 1// 4// 9
// usage #4
var pull = require('pull-stream')// var take = require('pull-stream/throughs/take') // if you just need takepull(  pull.values(['a', 'b', 'c', 'd', 'e']),  pull.take(3),  pull.collect((err, data) => {    console.log(data)    // => ['a', 'b', 'c']  }))
// usage #5
pull(  pull.values([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),  pull.take(n => n < 4.6), { last: true }),  // include the last value tested (5)  pull.collect(function (err, results) {    console.log(results)    // => [1, 2, 3, 4, 5]  })})
// usage #6
pull(  pull.values([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),  pull.take(n => n < 4.6), { last: false }),  // exclude the last value tested (5)  pull.collect(function (err, results) {    console.log(results)    // => [1, 2, 3, 4]  })})
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');
describe('test pull_stream', function() {
    it('test pull-stream.log', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.