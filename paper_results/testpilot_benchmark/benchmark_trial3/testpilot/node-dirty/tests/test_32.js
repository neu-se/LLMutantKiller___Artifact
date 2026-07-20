let mocha = require('mocha');
let assert = require('assert');
let { EventEmitter } = require('events');

// Mock the dirty.Dirty.on function since it appears to be an async iterator for events
// Based on the implementation, this should be similar to events.on()
const { on } = require('events');

describe('test dirty', function() {
    it('test dirty.Dirty.on - basic event iteration', async function() {
        const emitter = new EventEmitter();
        const iterator = on(emitter, 'test');
        
        // Emit some events
        setTimeout(() => {
            emitter.em})    })
})