let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    it('test dirty.Dirty.on with basic event listening', function(done) {
        const emitter = new EventEmitter();
        const testEvent = 'testEvent';
        const testData = { message: 'hello world' };
        
        // Set up the event listener using dirty.Dirty.on
        dirty.Dirty.on(emitter, testEvent);
        
        // Listen for the event to verify it was properly set up
        emitter.on(testEvent, (data) => {
            assert.strictEqual(data.message, testData.message);
            done();
        });
        
        // Emit the event
        emitter.em    })
})