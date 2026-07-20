let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.keys with empty object', function(done) {
        const testObject = {};
        
        pull_stream(
            pull_stream.keys(testObject),
            pull_stream.collect(function(err, result) {
                assert.ifError(err);
                assert.deepEqual(result, []);
                done();
            })
        );
    });
});