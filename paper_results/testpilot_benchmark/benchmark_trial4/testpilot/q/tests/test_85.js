let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nextTick.runAfter executes task asynchronously', function(done) {
        let executed = false;
        let task = function() {
            executed = true;
        };
        
        q.nextTick.runAfter(task);
        
        // Task should not be executed immediately
        assert.strictEqual(executed, false);
        
        // Check that task is executed on next tick
        process.nextTick(function() {
            assert.strictEqual(executed, true);
            done();
        });
    });
});