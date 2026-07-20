let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.once with null value', function(done) {
        const source = pull_stream.once(null);
        
        source(false, function(err, value) {
            assert.strictEqual(err, true);
            assert.strictEqual(value, undefined);
            done();
        });
    });
});