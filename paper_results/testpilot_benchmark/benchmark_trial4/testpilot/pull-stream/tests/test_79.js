let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.values with onAbort callback', function(done) {
        const testArray = [1, 2, 3];
        let abortCalled = false;
        
        const source = pull_stream.values(testArray, function() {
            abortCalled = true;
        });
        
        // Read one item then abort
        source(false, function(end, data) {
            assert.strictEqual(end, null);
            assert.strictEqual(data, 1);
            
            // Now abort
            source(true, function(end, data) {
                assert.strictEqual(end, true);
                assert.strictEqual(abortCalled, true);
                done();
            });
        });
    });
});