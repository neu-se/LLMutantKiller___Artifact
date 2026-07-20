let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let { EventEmitter } = require('events');

describe('test dirty', function() {
    describe('dirty.Dirty.once', function() {
        it('should resolve when event is emitted', async function() {
            const emitter = new EventEmitter();
            const eventName = 'test-event';
            const testData = { message: 'hello world' };
            
            // Start listening for the event
            const oncePromise = dirty.Dirty.once(emitter, eventName);
            
            // Emit the event after a short delay
            setTimeout(() => {
                emitter.em})})    })
})