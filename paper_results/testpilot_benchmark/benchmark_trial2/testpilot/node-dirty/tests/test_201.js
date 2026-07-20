let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.eventNames - no events', function(done) {
        try {
            // Create a new dirty database instance
            let db = dirty();
            
            // Get event names when no listeners are registered
            let eventNames = db.eventNames();
            
            // Should return an empty array
            assert(Array.isArray(eventNames), 'eventNames should return an array');
            assert.strictEqual(eventNames.length, 0, 'should have no event names initially');
            
            done();
        } catch (error) {
            done(error);
        }
    });

    })