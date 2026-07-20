let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.listenerCount with EventEmitter instance', function(done) {
        const emitter = new EventEmitter();
        const testEvent = 'testEvent';
        
        // Initially should have 0 listeners
        const initialCount = dirty.Dirty.EventEmitter.EventEmitterAsyncResource.listenerCount(emitter, testEvent);
        assert.strictEqual(initialCount, 0);
        
        // Add a listener
        const listener1 = () => {};
        emitter.on(testEvent, listener1);
        
        const countAfterOne = dirty.Dirty.EventEmitter.EventEmitterAsyncResource.listenerCount(emitter, testEvent);
        assert.strictEqual(countAfterOne, 1);
        
        // Add another listener
        const listener2 = () => {};
        emitter.on(testEvent, listener2);
        
        const countAfterTwo = dirty.Dirty.EventEmitter.EventEmitterAsyncResource.listenerCount(emitter, testEvent);
        assert.strictEqual(countAfterTwo, 2);
        
        done();
    });

    })