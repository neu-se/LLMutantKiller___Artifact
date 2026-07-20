let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    it('test dirty.Dirty.on with options parameter', function(done) {
        const emitter = new EventEmitter();
        const testEvent = 'testEventWithOptions';
        const options = { once: true };
        
        // Set up the event listener with options
        dirty.Dirty.on(emitter, testEvent, options);
        
        let callCount = 0;
        emitter.on(testEvent, () => {
            callCount++;
        });
        
        // Emit the event twice
        emitter.em    })
})