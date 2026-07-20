let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.map with object transformation', function(done) {
        const source = pull_stream.values([
            { name: 'Alice', age: 25 },
            { name: 'Bob', age: 30 },
            { name: 'Charlie', age: 35 }
        ]);
        const mapper = obj => ({ ...obj, age: obj.age + 1 });
        
        pull_stream(
            source,
            pull_stream.map(mapper),
            pull_stream.collect(function(err, results) {
                assert.ifError(err);
                assert.deepEqual(results, [
                    { name: 'Alice', age: 26 },
                    { name: 'Bob', age: 31 },
                    { name: 'Charlie', age: 36 }
                ]);
                done();
            })
        );
    });
});