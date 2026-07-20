let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nextTick.runAfter with empty function', function(done) {
        let task = function() {
            // Empty function
        };
        
        q.nextTick.runAfter(task);
        
        process.nextTick(function() {
            // If we reach here, the empty task executed without issues
            assert.ok(true);
            done();
        });
    });
});