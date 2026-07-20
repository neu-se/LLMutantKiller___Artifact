let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    it('test dirty.Dirty.on with options parameter', function(done) {
        const emitter = new EventEmitter();
        const eventName = 'testEventWithOptions';
        const options = { once: true };
        
        dirty.Dirty.on(emitter, eventName, options);
        
        let callCount = 0;
        emitter.on(eventName, () => {
            callCount++;
        });
        
        // Emit the event twice
        emitter.em    })
})