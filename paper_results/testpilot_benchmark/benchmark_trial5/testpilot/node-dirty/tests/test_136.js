let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.prependListener - multiple prepends', function(done) {
        let db = dirty();
        let callOrder = [];
        
        // Add initial listener
        db.on('multi-test', function() {
            callOrder.push('last');
        });
        
        // Prepend multiple listeners
        db.prependListener('multi-test', function() {
            callOrder.push('second');
        });
        
        db.prependListener('multi-test', function() {
            callOrder.push('first');
        });
        
        // Add a final listener to check the order and call done
        db.on('multi-test', function() {
            // Check that the order is correct: first prepended listener, second prepended listener, then original listener
            assert.deepEqual(callOrder, ['first', 'second', 'last']);
            done();
        });
        
        // Emit the event to trigger all listeners
        db.em    })
})