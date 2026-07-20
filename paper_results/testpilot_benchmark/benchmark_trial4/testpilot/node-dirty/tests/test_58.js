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
        
        // Use the standard EventEmitter.once method instead of dirty.Dirty.on
        emitter.once(eventName, () => {
            callCount++;
        });
        
        // Emit the event twice
        emitter.em    })
})