let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.init', function() {
        
        it('should initialize _events and _eventsCount when _events is undefined', function() {
            const instance = Object.create(dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype);
            
            // Ensure _events is undefined
            instance._events = undefined;
            
            dirty.Dirty.EventEmitter.EventEmitterAsyncResource.init.call(instance, {});
            
            assert.strictEqual(typeof instance._events, 'object');
            assert.strictEqual(Object.getPrototypeOf(instance._events), null);
            assert.strictEqual(instance._eventsCount, 0);
            assert.strictEqual(instance[Symbol.for('kShapeMode')], false);
        });

    })
})