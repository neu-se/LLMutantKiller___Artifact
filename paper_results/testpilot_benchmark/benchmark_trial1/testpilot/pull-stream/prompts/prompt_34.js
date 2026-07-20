The test:
```
let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.through - filtering data', function(done) {
        let results = [];
        
        pull_stream(
            pull_stream.values([1, 2, 3, 4, 5, 6]),
            pull_stream.through(function(data) {
                if (data % 2 === 0) {
                    this.queue(data);
                }
            }),
            pull_stream.drain(function(data) {
                results.push(data);
            }, function(err) {
                assert.ifError(err);
                assert.deepEqual(results, [2, 4, 6]);
                done();
            })
        );
    });

    })
``` 
failed with the following error message:
```
this.queue is not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.