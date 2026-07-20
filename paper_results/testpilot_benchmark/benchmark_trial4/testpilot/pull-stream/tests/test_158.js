let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.empty - should handle abort signal', function(done) {
        const emptySource = pull_stream.empty();
        
        emptySource(true, function(end, data) {
            assert.strictEqual(end, true, 'Stream should end when aborted');
            assert.strictEqual(data, undefined, 'No data should be provided when aborted');
            done();
        });
    });
});