The test:
```
let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.nonUnique with primitive values', function(done) {
        let input = [1, 2, 2, 3, 3, 3, 4];
        let expected = [2, 2, 3, 3, 3];
        let result = [];
        
        pull_stream(
            pull_stream.values(input),
            pull_stream.nonUnique(),
            pull_stream.collect(function(err, data) {
                if (err) return done(err);
                assert.deepEqual(data, expected);
                done();
            })
        );
    });

    })
``` 
failed with the following error message:
```
Expected values to be loosely deep-equal:

[
  2,
  3,
  3
]

should loosely deep-equal

[
  2,
  2,
  3,
  3,
  3
]  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.