let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    it('test dirty.Dirty.on without options parameter', function(done) {
        const emitter = new EventEmitter();
        const eventName = 'testEventNoOptions';
        
        // Test without options parameter (should use default kEmptyObject)
        dirty.Dirty.on(emitter, eventName, () => {
            assert(true); // Just verify the event was handled
            done();
        });
        
        // Emit the event to trigger the listener
        emitter.em    })
})