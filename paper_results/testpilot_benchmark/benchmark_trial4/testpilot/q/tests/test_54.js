let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nextTick executes after current call stack', function(done) {
        let executionOrder = [];
        
        executionOrder.push('sync1');
        
        q.nextTick(function() {
            executionOrder.push('async1');
            assert.deepStrictEqual(executionOrder, ['sync1', 'sync2', 'async1']);
            done();
        });
        
        executionOrder.push('sync2');
    });
});