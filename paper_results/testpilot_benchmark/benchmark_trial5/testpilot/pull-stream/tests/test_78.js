let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.values with onAbort callback', function(done) {
        let abortCalled = false;
        const onAbort = function() {
            abortCalled = true;
        };
        
        const testArray = [1, 2, 3];
        const source = pull_stream.values(testArray, onAbort);
        
        // Read one item then abort
        source(false, function(err, data) {
            assert.strictEqual(err, null);
            assert.strictEqual(data, 1);
            
            // Now abort
            source(true, function(abortErr) {
                assert.strictEqual(abortErr, true);
                assert.strictEqual(abortCalled, true);
                done();
            });
        });
    });
});