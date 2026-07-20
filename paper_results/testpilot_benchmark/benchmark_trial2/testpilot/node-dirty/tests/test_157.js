let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.removeListener - remove from non-existent event', function(done) {
        let db = dirty();
        
        function testListener() {
            // This should not cause any errors
        }
        
        // Try to remove listener from event that has no listeners
        assert.doesNotThrow(() => {
            db.removeListener('non-existent-event', testListener);
        }, 'Removing listener from non-existent event should not throw');
        
        done();
    });

    })