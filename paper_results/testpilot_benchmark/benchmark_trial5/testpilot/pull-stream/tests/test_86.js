let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.values abort functionality', function(done) {
        let abortCalled = false;
        const onAbort = function() {
            abortCalled = true;
        };
        
        const source = pull_stream.values([1, 2, 3, 4, 5], onAbort);
        
        // Manually call the source function to test abort
        source(true, function(err, data) {
            assert.strictEqual(abortCalled, true);
            assert.strictEqual(err, true);
            done();
        });
    });
});