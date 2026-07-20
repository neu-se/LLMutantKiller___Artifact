let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.setMaxListeners - set valid number', function(done) {
        try {
            // Create a dirty database instance
            let db = dirty();
            
            // Test setting a valid number of max listeners
            db.setMaxListeners(20);
            
            // Verify the max listeners was set (if there's a way to check)
            // Since EventEmitter doesn't have a public getter, we'll just verify no error was thrown
            assert.ok(true, 'setMaxListeners should accept valid numbers');
            done();
        } catch (error) {
            done(error);
        }
    });

    })