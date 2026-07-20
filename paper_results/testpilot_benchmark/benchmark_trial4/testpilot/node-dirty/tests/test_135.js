let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.listenerCount with EventEmitter instance', function(done) {
        const emitter = new EventEmitter();
        const eventType = 'test-event';
        
        // Initially should have 0 listeners
        const initialCount = dirty.Dirty.EventEmitter.EventEmitterAsyncResource.listenerCount(emitter, eventType);
        assert.strictEqual(initialCount, 0);
        
        // Add a listener
        const listener1 = () => {};
        emitter.on(eventType, listener1);
        
        const countAfterOne = dirty.Dirty.EventEmitter.EventEmitterAsyncResource.listenerCount(emitter, eventType);
        assert.strictEqual(countAfterOne, 1);
        
        // Add another listener
        const listener2 = () => {};
        emitter.on(eventType, listener2);
        
        const countAfterTwo = dirty.Dirty.EventEmitter.EventEmitterAsyncResource.listenerCount(emitter, eventType);
        assert.strictEqual(countAfterTwo, 2);
        
        done();
    });

    })