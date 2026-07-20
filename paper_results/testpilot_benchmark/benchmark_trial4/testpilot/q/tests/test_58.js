let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nextTick executes multiple tasks in order', function(done) {
        let results = [];
        let completedTasks = 0;
        
        q.nextTick(function() {
            results.push(1);
            completedTasks++;
            if (completedTasks === 3) {
                assert.deepStrictEqual(results, [1, 2, 3]);
                done();
            }
        });
        
        q.nextTick(function() {
            results.push(2);
            completedTasks++;
            if (completedTasks === 3) {
                assert.deepStrictEqual(results, [1, 2, 3]);
                done();
            }
        });
        
        q.nextTick(function() {
            results.push(3);
            completedTasks++;
            if (completedTasks === 3) {
                assert.deepStrictEqual(results, [1, 2, 3]);
                done();
            }
        });
    });
});