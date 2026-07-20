let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nextTick.runAfter handles empty function', function(done) {
        let task = function() {
            // Empty function
        };
        
        // Should not throw any errors
        assert.doesNotThrow(function() {
            q.nextTick.runAfter(task);
        });
        
        process.nextTick(function() {
            done();
        });
    });
});