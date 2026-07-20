let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.init', function() {
        
        it('should preserve existing _maxListeners or set to undefined', function() {
            const instance = Object.create(dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype);
            instance._maxListeners = 10;
            
            dirty.Dirty.EventEmitter.EventEmitterAsyncResource.init.call(instance, {});
            
            assert.strictEqual(instance._maxListeners, 10);
            
            // Test with no existing _maxListeners
            const instance2 = Object.create(dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype);
            dirty.Dirty.EventEmitter.EventEmitterAsyncResource.init.call(instance2, {});
            
            assert.strictEqual(instance2._maxListeners, undefined);
        });

            })
})