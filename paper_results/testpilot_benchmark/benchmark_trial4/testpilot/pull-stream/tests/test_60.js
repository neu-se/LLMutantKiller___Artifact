let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.once with abort', function(done) {
        const testValue = 'test';
        const source = pull_stream.once(testValue);
        
        source(true, function(end, data) {
            assert.strictEqual(end, true);
            assert.strictEqual(data, undefined);
            done();
        });
    });
});