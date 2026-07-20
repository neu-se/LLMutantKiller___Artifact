let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.once with zero value', function(done) {
        const source = pull_stream.once(0);
        
        source(false, function(end, data) {
            assert.strictEqual(end, null);
            assert.strictEqual(data, 0);
            done();
        });
    });
});