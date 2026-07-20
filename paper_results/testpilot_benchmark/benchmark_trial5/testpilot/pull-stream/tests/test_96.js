let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.values with null/undefined', function(done) {
        const source = pull_stream.values(null);
        
        source(false, function(err, data) {
            assert.strictEqual(err, true); // Should immediately end
            assert.strictEqual(data, undefined);
            done();
        });
    });
});