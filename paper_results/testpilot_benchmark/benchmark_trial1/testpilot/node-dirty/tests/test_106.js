let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.init', function() {
        
        it('should preserve existing _maxListeners or set to undefined', function() {
            const instance1 = Object.create(dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype);
            const instance2 = Object.create(dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype);
            instance2._maxListeners = 10;
            
            dirty.Dirty.EventEmitter.EventEmitterAsyncResource.init.call(instance1);
            dirty.Dirty.EventEmitter.EventEmitterAsyncResource.init.call(instance2);
            
            assert.strictEqual(instance1._maxListeners, undefined);
            assert.strictEqual(instance2._maxListeners, 10);
        });

            })
})