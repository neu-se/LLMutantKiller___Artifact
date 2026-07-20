The test:
```
let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.nonUnique with object field', function(done) {
        let input = [
            {id: 1, name: 'Alice'},
            {id: 2, name: 'Bob'},
            {id: 2, name: 'Bob'},
            {id: 3, name: 'Charlie'},
            {id: 3, name: 'Charlie'},
            {id: 4, name: 'David'}
        ];
        let expected = [
            {id: 2, name: 'Bob'},
            {id: 2, name: 'Bob'},
            {id: 3, name: 'Charlie'},
            {id: 3, name: 'Charlie'}
        ];
        let result = [];
        
        pull_stream(
            pull_stream.values(input),
            pull_stream.nonUnique('id'),
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
  {
    id: 2,
    name: 'Bob'
  },
  {
    id: 3,
    name: 'Charlie'
  }
]

should loosely deep-equal

[
  {
    id: 2,
    name: 'Bob'
  },
  {
    id: 2,
    name: 'Bob'
  },
  {
    id: 3,
    name: 'Charlie'
  },
  {
    id: 3,
    name: 'Charlie'
  }
]  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.