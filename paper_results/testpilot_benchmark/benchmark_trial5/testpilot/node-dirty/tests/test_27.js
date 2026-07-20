let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    it('test dirty.Dirty.on with empty options object', function(done) {
        const emitter = new EventEmitter();
        const eventName = 'testEventEmptyOptions';
        
        // Test with empty object (default parameter)
        dirty.Dirty.on(emitter, eventName, {});
        
        emitter.on(eventName, (data) => {
            assert.strictEqual(data, 'test');
            done();
        });
        
        emitter.em    })
})