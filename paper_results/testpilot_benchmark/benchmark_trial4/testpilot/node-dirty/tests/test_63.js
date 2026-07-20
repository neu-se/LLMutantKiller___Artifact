let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    it('test dirty.Dirty.on with basic event listening', function(done) {
        const emitter = new EventEmitter();
        const eventName = 'testEvent';
        const testData = { message: 'hello world' };
        
        // Add our listener to verify the event is emitted
        emitter.on(eventName, (data) => {
            assert.strictEqual(data.message, testData.message);
            done();
        });
        
        // Emit the event with the test data
        emitter.em    })
})