let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.empty - multiple calls should behave consistently', function(done) {
        const emptySource = pull_stream.empty();
        let callCount = 0;
        
        function testCall() {
            emptySource(false, function(end, data) {
                assert.strictEqual(end, true, 'Stream should end on call ' + (callCount + 1));
                assert.strictEqual(data, undefined, 'No data should be provided on call ' + (callCount + 1));
                callCount++;
                
                if (callCount === 3) {
                    done();
                } else {
                    testCall();
                }
            });
        }
        
        testCall();
    });
});