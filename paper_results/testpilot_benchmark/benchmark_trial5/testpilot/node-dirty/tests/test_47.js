let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let { EventEmitter } = require('events');

describe('test dirty', function() {
    describe('dirty.Dirty.getEventListeners', function() {
        
        it('should return listeners for EventEmitter', function(done) {
            const emitter = new EventEmitter();
            const listener1 = () => {};
            const listener2 = () => {};
            
            emitter.on('test', listener1);
            emitter.on('test', listener2);
            
            const listeners = dirty.Dirty.getEventListeners(emitter, 'test');
            
            assert.strictEqual(listeners.length, 2);
            assert.strictEqual(listeners[0], listener1);
            assert.strictEqual(listeners[1], listener2);
            done();
        });

            })
})