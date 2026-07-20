let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let { EventEmitterAsyncResource } = require('events');

describe('test dirty', function() {
    describe('EventEmitterAsyncResource emitDestroy', function() {
        
        it('should mark resource as destroyed after emitDestroy', function(done) {
            // Create an instance of EventEmitterAsyncResource directly
            let testInstance = new EventEmitterAsyncResource({
                name: 'test-resource'
            });
            
            // Verify initial state
            assert.strictEqual(testInstance.destroyed, false, 'Resource should not be destroyed initially');
            
            // Listen for destroy event
            testInstance.on('destroy', () => {
                setImmediate(() => {
                    assert.strictEqual(testInstance.destroyed, true, 'Resource should be marked as destroyed');
                    done();
                });
            });
            
            // Trigger destroy
            testInstance.emitDestroy();
        });
    });
});