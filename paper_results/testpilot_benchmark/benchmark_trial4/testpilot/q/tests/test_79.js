let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nextTick executes multiple tasks in order', function(done) {
        let results = [];
        let completedTasks = 0;
        
        let checkCompletion = function() {
            completedTasks++;
            if (completedTasks === 3) {
                assert.deepStrictEqual(results, ['task1', 'task2', 'task3']);
                done();
            }
        };
        
        let task1 = function() {
            results.push('task1');
            checkCompletion();
        };
        
        let task2 = function() {
            results.push('task2');
            checkCompletion();
        };
        
        let task3 = function() {
            results.push('task3');
            checkCompletion();
        };
        
        q.nextTick(task1);
        q.nextTick(task2);
        q.nextTick(task3);
    });
});