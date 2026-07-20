let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.init', function() {
        
        it('should set kShapeMode to true when _events already exists and differs from prototype', function() {
            const instance = Object.create(dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype);
            instance._events = { existing: 'events' };
            
            dirty.Dirty.EventEmitter.EventEmitterAsyncResource.init.call(instance);
            
            // Check if the property exists with a different symbol or property name
            // Try common variations:
            const kShapeMode = instance.kShapeMode || 
                              instance[Symbol.for('nodejs.events.kShapeMode')] ||
                              instance[Symbol.for('kShapeMode')] ||
                              instance._kShapeMode;
            
            assert.strictEqual(kShapeMode, true);
            assert.deepStrictEqual(instance._events, { existing: 'events' });
        });

    })
})