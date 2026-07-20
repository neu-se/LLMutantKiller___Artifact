let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.setMaxListeners', function() {
        
        it('should set default max listeners when no event targets provided', function(done) {
            const originalDefault = dirty.Dirty.EventEmitter.EventEmitterAsyncResource.defaultMaxListeners || 10;
            
            // Set new default
            dirty.Dirty.EventEmitter.EventEmitterAsyncResource.setMaxListeners(15);
            
            // Create a new EventEmitter to verify the default was changed
            const emitter = new EventEmitter();
            assert.strictEqual(emitter.getMaxListeners(), 15);
            
            // Restore original default
            dirty.Dirty.EventEmitter.EventEmitterAsyncResource.setMaxListeners(originalDefault);
            done();
        });

            })
})