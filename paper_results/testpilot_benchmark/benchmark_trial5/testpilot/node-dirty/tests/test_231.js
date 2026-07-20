let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.listeners - no listeners', function(done) {
        try {
            // Create a dirty database instance
            let db = dirty();
            
            // Test listeners method with no registered listeners
            let listeners = db.listeners('test-event');
            
            // Should return an empty array when no listeners are registered
            assert(Array.isArray(listeners), 'listeners should return an array');
            assert.strictEqual(listeners.length, 0, 'should have no listeners initially');
            
            done();
        } catch (error) {
            done(error);
        }
    });

    })