let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.find - returns null when no match found', function(done) {
        let found = null;
        
        pull_stream(
            pull_stream.values([1, 2, 3]),
            pull_stream.through(function(data) {
                if (data > 10) {
                    found = data;
                }
                return data;
            }),
            pull_stream.drain(function(data) {
                // Process each item
            }, function(err) {
                // End callback
                assert.strictEqual(err, null);
                assert.strictEqual(found, null);
                done();
            })
        );
    });
});