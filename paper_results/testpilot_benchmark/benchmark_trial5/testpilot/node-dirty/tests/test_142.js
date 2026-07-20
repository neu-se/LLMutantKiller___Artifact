let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.once - multiple listeners', function(done) {
        let db = dirty();
        
        let listener1Called = false;
        let listener2Called = false;
        
        // Register multiple once listeners for the same event
        db.once('test-event', function() {
            listener1Called = true;
        });
        
        db.once('test-event', function() {
            listener2Called = true;
        });
        
        // Emit the event
        db.em    })
})