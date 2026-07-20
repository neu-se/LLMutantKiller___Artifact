let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    it('test dirty.Dirty.on with empty options object', function(done) {
        const emitter = new EventEmitter();
        const testEvent = 'testEventEmptyOptions';
        
        // Set up the event listener
        emitter.on(testEvent, (data) => {
            assert.strictEqual(data, 'test data');
            done();
        });
        
        // Emit the test event
        emitter.em    })
})