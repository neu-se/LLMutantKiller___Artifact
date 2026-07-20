let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.once - multiple listeners', function(done) {
        let db = dirty();
        
        let firstListenerCalled = false;
        let secondListenerCalled = false;
        let callCount = 0;
        
        // Register two once listeners
        db.once('multi-test', function() {
            firstListenerCalled = true;
            callCount++;
            checkCompletion();
        });
        
        db.once('multi-test', function() {
            secondListenerCalled = true;
            callCount++;
            checkCompletion();
        });
        
        function checkCompletion() {
            if (callCount === 2) {
                assert.strictEqual(firstListenerCalled, true, 'First listener should be called');
                assert.strictEqual(secondListenerCalled, true, 'Second listener should be called');
                done();
            }
        }
        
        // Emit the event
        db.em    })
})