let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.prependOnceListener - prepend order', function(done) {
        let db = dirty();
        let executionOrder = [];
        
        // Add a regular listener first
        db.on('order-test', function() {
            executionOrder.push('regular');
        });
        
        // Add a prependOnceListener - this should execute first
        db.prependOnceListener('order-test', function() {
            executionOrder.push('prepended-once');
        });
        
        // Add another regular listener
        db.on('order-test', function() {
            executionOrder.push('regular2');
            
            // Verify execution order
            assert.deepStrictEqual(executionOrder, ['prepended-once', 'regular', 'regular2']);
            done();
        });
        
        db.em    })
})