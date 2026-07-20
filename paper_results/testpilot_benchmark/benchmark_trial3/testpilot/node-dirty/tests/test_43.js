let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    it('test dirty.Dirty.on with options parameter', function(done) {
        const emitter = new EventEmitter();
        const testEvent = 'testEventWithOptions';
        const options = { once: true };
        
        let callCount = 0;
        
        // Set up the event listener with options (using native EventEmitter once method)
        emitter.once(testEvent, () => {
            callCount++;
        });
        
        // Emit the event twice
        emitter.em    })
})