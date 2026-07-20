let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nextTick executes after current execution context', function(done) {
        let executionOrder = [];
        
        let task = function() {
            executionOrder.push('async');
            assert.deepStrictEqual(executionOrder, ['sync', 'async']);
            done();
        };
        
        q.nextTick(task);
        executionOrder.push('sync');
    });
});