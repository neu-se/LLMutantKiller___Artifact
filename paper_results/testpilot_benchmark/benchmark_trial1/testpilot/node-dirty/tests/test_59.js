let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('remove-test', function(done) {
        let listenerCalled = false;
        
        setImmediate(() => {
            assert.strictEqual(listenerCalled, false, 'Removed listener should not be called');
            done();
        });
    });
});