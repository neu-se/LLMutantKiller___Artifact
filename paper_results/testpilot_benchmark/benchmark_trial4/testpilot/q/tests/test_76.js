let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nextTick.runAfter executes after current execution context', function(done) {
        let executionOrder = [];
        
        let task = function() {
            executionOrder.push('async');
            assert.deepStrictEqual(executionOrder, ['sync', 'async']);
            done();
        };
        
        q.nextTick.runAfter(task);
        executionOrder.push('sync');
    });
});