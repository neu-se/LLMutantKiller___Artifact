let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.empty - should immediately end stream', function(done) {
        const emptySource = pull_stream.empty();
        
        emptySource(false, function(end, data) {
            assert.strictEqual(end, true, 'Stream should end immediately');
            assert.strictEqual(data, undefined, 'No data should be provided');
            done();
        });
    });
});