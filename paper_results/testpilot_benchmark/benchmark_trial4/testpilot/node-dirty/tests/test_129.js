let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.init', function() {
        
        it('should set kShapeMode to true when _events already exists and differs from prototype', function() {
            const instance = Object.create(dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype);
            instance._events = { existing: 'event' };
            
            dirty.Dirty.EventEmitter.EventEmitterAsyncResource.init.call(instance, {});
            
            // Try different ways to access kShapeMode
            const kShapeMode = Object.getOwnPropertySymbols(instance).find(sym => 
                sym.toString() === 'Symbol(kShapeMode)' || sym.description === 'kShapeMode'
            ) || Symbol.for('nodejs.events.kShapeMode') || Symbol.for('kShapeMode');
            
            assert.strictEqual(instance[kShapeMode], true);
        });

    })
})