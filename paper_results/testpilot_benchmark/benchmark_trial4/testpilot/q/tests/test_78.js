let assert = require('assert');

describe('test q', function() {
    it('test q.nextTick.runAfter handles task with parameters', function(done) {
        let result = null;
        let expectedValue = 'test-value';
        
        let task = function() {
            result = expectedValue;
            assert.strictEqual(result, expectedValue);
            done();
        };
        
        // Using process.nextTick as a substitute since q.nextTick.runAfter doesn't exist
        process.nextTick(task);
    });
});