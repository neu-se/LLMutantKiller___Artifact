let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.once - with no emission', function(done) {
        let db = dirty();
        
        let listenerCalled = false;
        
        // Register a once listener but don't emit the event
        db.once('no-emit-test', function() {
            listenerCalled = true;
        });
        
        // Wait a bit and verify the listener was not called
        setTimeout(() => {
            assert.strictEqual(listenerCalled, false);
            done();
        }, 50);
    });

    })