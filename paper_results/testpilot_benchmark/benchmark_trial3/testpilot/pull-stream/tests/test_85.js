let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.values with object', function(done) {
        const testObject = { a: 1, b: 2, c: 3 };
        const source = pull_stream.values(testObject);
        
        pull_stream(
            source,
            pull_stream.collect(function(err, data) {
                assert.equal(err, null);
                assert.deepEqual(data, [1, 2, 3]);
                done();
            })
        );
    });
});