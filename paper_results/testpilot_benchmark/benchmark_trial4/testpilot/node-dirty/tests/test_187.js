let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.prependOnceListener - multiple prepended listeners', function(done) {
        let db = dirty();
        
        let executionOrder = [];
        
        let listener1 = function() {
            executionOrder.push('first');
        };
        
        let listener2 = function() {
            executionOrder.push('second');
        };
        
        let listener3 = function() {
            executionOrder.push('third');
            
            // Verify execution order: last prepended should be first
            assert.deepStrictEqual(executionOrder, ['third', 'second', 'first']);
            
            // Emit again to verify once listeners don't fire again
            db.em}    })
})