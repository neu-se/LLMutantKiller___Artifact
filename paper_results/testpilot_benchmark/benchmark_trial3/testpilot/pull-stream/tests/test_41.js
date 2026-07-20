let assert = require('assert');
let pull = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.keys with simple object', function(done) {
        const testObject = { a: 1, b: 2, c: 3 };
        const expectedKeys = ['a', 'b', 'c'];
        
        pull(
            pull.values(Object.keys(testObject)),
            pull.collect(function(err, result) {
                assert.ifError(err);
                assert.deepEqual(result.sort(), expectedKeys.sort());
                done();
            })
        );
    });
});