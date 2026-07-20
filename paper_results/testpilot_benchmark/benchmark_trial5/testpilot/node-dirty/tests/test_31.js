let mocha = require('mocha');
let assert = require('assert');
let { EventEmitter } = require('events');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.on', function() {
        let emitter;
        
        beforeEach(function() {
            emitter = new EventEmitter();
        });

        it('should create an async iterator for events', async function() {
            const iterator = dirty.Dirty.on(emitter, 'test');
            
            // Emit an event
            setTimeout(() => emitter.em)})    })
})