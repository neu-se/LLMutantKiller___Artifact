let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.once - multiple listeners', function(done) {
        let db = dirty();
        
        let firstListenerCalled = false;
        let secondListenerCalled = false;
        
        // Register two once listeners
        db.once('multi-test', function() {
            firstListenerCalled = true;
        });
        
        db.once('multi-test', function() {
            secondListenerCalled = true;
        });
        
        // Emit the event
        db.em    })
})