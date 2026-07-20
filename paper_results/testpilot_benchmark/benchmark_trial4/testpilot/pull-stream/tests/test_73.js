let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.values with array', function(done) {
        const testArray = [1, 2, 3, 'hello', 'world'];
        const source = pull_stream.values(testArray);
        const results = [];
        
        pull_stream(
            source,
            pull_stream.collect(function(err, data) {
                assert.strictEqual(err, null);
                assert.deepStrictEqual(data, testArray);
                done();
            })
        );
    });

    })