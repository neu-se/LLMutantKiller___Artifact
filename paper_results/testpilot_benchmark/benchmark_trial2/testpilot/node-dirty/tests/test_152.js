let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.removeListener - remove specific listener', function(done) {
        let db = dirty();
        let callCount1 = 0;
        let callCount2 = 0;
        
        function listener1() {
            callCount1++;
        }
        
        function listener2() {
            callCount2++;
        }
        
        // Add multiple listeners
        db.on('test-event', listener1);
        db.on('test-event', listener2);
        
        // Emit event to verify both listeners are attached
        db.em    })
})