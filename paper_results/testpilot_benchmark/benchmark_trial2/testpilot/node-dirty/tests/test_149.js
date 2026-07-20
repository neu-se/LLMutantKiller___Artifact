let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.removeListener - basic removal', function(done) {
        let db = dirty();
        let callCount = 0;
        
        function testListener() {
            callCount++;
        }
        
        // Add listener
        db.on('test-event', testListener);
        
        // Emit event to verify listener is attached
        db.em    })
})