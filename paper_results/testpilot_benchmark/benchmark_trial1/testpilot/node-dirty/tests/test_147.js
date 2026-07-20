let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.once - multiple listeners', function(done) {
        let db = dirty();
        
        let listener1Called = false;
        let listener2Called = false;
        
        // Add two different once listeners
        db.once('multi-event', function(data) {
            listener1Called = true;
            assert.strictEqual(data, 'multi-data');
        });
        
        db.once('multi-event', function(data) {
            listener2Called = true;
            assert.strictEqual(data, 'multi-data');
            
            // Check that both listeners were called
            setTimeout(() => {
                assert.strictEqual(listener1Called, true);
                assert.strictEqual(listener2Called, true);
                done();
            }, 10);
        });
        
        // Emit the event once
        db.em    })
})