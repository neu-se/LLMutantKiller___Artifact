let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.once with zero value', function(done) {
        const testValue = 0;
        const source = pull_stream.once(testValue);
        
        source(false, function(err, value) {
            assert.strictEqual(err, null);
            assert.strictEqual(value, testValue);
            done();
        });
    });
});