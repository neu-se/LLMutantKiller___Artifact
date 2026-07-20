let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.find - handles empty stream', function(done) {
        let found = false;
        let result = null;
        
        pull_stream(
            pull_stream.values([]),
            pull_stream.drain(
                function(data) {
                    if (!found) {
                        found = true;
                        result = data;
                    }
                },
                function(err) {
                    assert.strictEqual(err, null);
                    assert.strictEqual(result, null);
                    done();
                }
            )
        );
    });
});