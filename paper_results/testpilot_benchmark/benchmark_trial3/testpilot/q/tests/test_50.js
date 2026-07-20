let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nextTick executes after current call stack', function(done) {
        let executionOrder = [];
        
        executionOrder.push('sync-1');
        
        q.nextTick(function() {
            executionOrder.push('async-1');
            assert.deepStrictEqual(executionOrder, ['sync-1', 'sync-2', 'async-1']);
            done();
        });
        
        executionOrder.push('sync-2');
    });
});