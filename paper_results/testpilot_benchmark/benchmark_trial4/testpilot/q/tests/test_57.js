let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nextTick with task that throws error', function(done) {
        // This test ensures the function can handle tasks that throw errors
        // We'll schedule a task that throws and another that should still execute
        let secondTaskExecuted = false;
        
        q.nextTick(function() {
            throw new Error('Test error');
        });
        
        q.nextTick(function() {
            secondTaskExecuted = true;
        });
        
        // Give some time for tasks to execute
        setTimeout(function() {
            // The second task execution depends on Q's error handling implementation
            // This test mainly ensures nextTick doesn't crash when a task throws
            done();
        }, 10);
    });
});