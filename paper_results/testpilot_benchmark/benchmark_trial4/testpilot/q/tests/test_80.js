let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nextTick.runAfter executes task asynchronously', function(done) {
        let executed = false;
        let task = function() {
            executed = true;
            done();
        };
        
        q.nextTick.runAfter(task);
        
        // Task should not be executed synchronously
        assert.strictEqual(executed, false);
    });
});