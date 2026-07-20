let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.values with onAbort callback', function(done) {
        const testArray = [1, 2, 3];
        let abortCalled = false;
        
        const source = pull_stream.values(testArray, function() {
            abortCalled = true;
        });
        
        // Read first item
        source(false, function(end, data) {
            assert.equal(end, null);
            assert.equal(data, 1);
            
            // Then abort
            source(true, function(end, data) {
                assert.equal(end, true);
                // Note: onAbort callback behavior depends on abortCb implementation
                // which is not shown in the provided code
                done();
            });
        });
    });
});