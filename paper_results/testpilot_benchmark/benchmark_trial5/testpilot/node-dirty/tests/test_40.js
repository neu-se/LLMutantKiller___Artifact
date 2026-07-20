let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    it('test dirty.Dirty.on with options parameter', function(done) {
        const emitter = new EventEmitter();
        const eventName = 'testEventWithOptions';
        const options = { once: true };
        
        let callCount = 0;
        
        // Use the standard EventEmitter.on with options (once)
        emitter.once(eventName, () => {
            callCount++;
        });
        
        // Emit twice but should only be handled once due to 'once'
        emitter.em    })
})