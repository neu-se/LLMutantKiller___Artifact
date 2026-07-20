let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.empty - should work with pull pipeline', function(done) {
        const results = [];
        
        pull_stream(
            pull_stream.empty(),
            pull_stream.collect(function(err, data) {
                assert.strictEqual(err, null, 'No error should occur');
                assert.deepStrictEqual(data, [], 'Collected data should be empty array');
                done();
            })
        );
    });
});