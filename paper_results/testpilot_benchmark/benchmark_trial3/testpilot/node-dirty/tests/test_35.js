let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    it('test dirty.Dirty.on with no options parameter (default)', function(done) {
        const emitter = new EventEmitter();
        const testEvent = 'defaultOptionsTest';
        
        // Set up the event listener
        emitter.on(testEvent, (data) => {
            assert.strictEqual(data.value, 42);
            done();
        });
        
        // Emit the test event with the expected data
        emitter.em    })
})