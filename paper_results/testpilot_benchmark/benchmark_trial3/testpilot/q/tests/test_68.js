let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nextTick.runAfter executes multiple tasks in order', function(done) {
        let results = [];
        let completedTasks = 0;
        
        let task1 = function() {
            results.push('task1');
            completedTasks++;
            if (completedTasks === 3) {
                assert.deepStrictEqual(results, ['task1', 'task2', 'task3']);
                done();
            }
        };
        
        let task2 = function() {
            results.push('task2');
            completedTasks++;
            if (completedTasks === 3) {
                assert.deepStrictEqual(results, ['task1', 'task2', 'task3']);
                done();
            }
        };
        
        let task3 = function() {
            results.push('task3');
            completedTasks++;
            if (completedTasks === 3) {
                assert.deepStrictEqual(results, ['task1', 'task2', 'task3']);
                done();
            }
        };
        
        q.nextTick.runAfter(task1);
        q.nextTick.runAfter(task2);
        q.nextTick.runAfter(task3);
    });
    
    })