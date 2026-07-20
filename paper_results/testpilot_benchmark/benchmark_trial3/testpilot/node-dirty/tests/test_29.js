let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    it('test dirty.Dirty.on with no options parameter (default)', function(done) {
        const emitter = new EventEmitter();
        const testEvent = 'defaultOptionsTest';
        
        // Call without options parameter to test default behavior
        dirty.Dirty.on(emitter, testEvent);
        
        emitter.on(testEvent, (data) => {
            assert.strictEqual(data.value, 42);
            done();
        });
        
        emitter.em    })
})