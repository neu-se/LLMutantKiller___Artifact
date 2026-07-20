let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.once with onAbort callback', function(done) {
        const testValue = 'test';
        let abortCalled = false;
        
        const onAbort = function() {
            abortCalled = true;
        };
        
        const source = pull_stream.once(testValue, onAbort);
        
        source(true, function(err, value) {
            assert.strictEqual(err, true);
            assert.strictEqual(value, undefined);
            assert.strictEqual(abortCalled, true);
            done();
        });
    });
});