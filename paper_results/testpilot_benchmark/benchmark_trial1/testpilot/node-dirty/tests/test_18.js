let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let { EventEmitter } = require('events');

describe('test dirty', function() {
    it('test dirty.Dirty.once - basic functionality', async function() {
        const emitter = new EventEmitter();
        
        // Start the once promise
        const oncePromise = dirty.Dirty.once(emitter, 'test');
        
        // Emit the event with some data
        setTimeout(() => {
            emitter.em})    })
})