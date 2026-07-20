let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.once - multiple listeners', function(done) {
        let db = dirty();
        
        let firstListenerCalled = false;
        let secondListenerCalled = false;
        
        // Register two once listeners for the same event
        db.once('multi-test', function(data) {
            firstListenerCalled = true;
            assert.strictEqual(data, 'multi-data');
        });
        
        db.once('multi-test', function(data) {
            secondListenerCalled = true;
            assert.strictEqual(data, 'multi-data');
            
            // Check that both listeners were called
            setTimeout(() => {
                assert.strictEqual(firstListenerCalled, true);
                assert.strictEqual(secondListenerCalled, true);
                done();
            }, 10);
        });
        
        // Emit the event once
        db.em    })
})