let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nextTick.runAfter executes after current execution context', function(done) {
        let executionOrder = [];
        
        executionOrder.push('sync1');
        
        q.nextTick.runAfter(function() {
            executionOrder.push('async');
        });
        
        executionOrder.push('sync2');
        
        process.nextTick(function() {
            assert.deepStrictEqual(executionOrder, ['sync1', 'sync2', 'async']);
            done();
        });
    });
});