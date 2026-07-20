let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let { EventEmitter } = require('events');

describe('test dirty', function() {
    describe('dirty.Dirty.once', function() {
        it('should resolve when event is emitted', async function() {
            const emitter = new EventEmitter();
            
            // Start listening for the event
            const promise = dirty.Dirty.once(emitter, 'test');
            
            // Emit the event with some data
            setTimeout(() => {
                emitter.em})})    })
})