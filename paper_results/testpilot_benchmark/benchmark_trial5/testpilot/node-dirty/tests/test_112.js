let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.setMaxListeners', function(done) {
        // Create a dirty database instance
        let db = dirty();
        
        // Test setting max listeners to a positive number
        db.setMaxListeners(20);
        assert.equal(db.getMaxListeners(), 20, 'Should set max listeners to 20');
        
        // Test setting max listeners to 0 (unlimited)
        db.setMaxListeners(0);
        assert.equal(db.getMaxListeners(), 0, 'Should set max listeners to 0 (unlimited)');
        
        // Test setting max listeners to default value
        db.setMaxListeners(10);
        assert.equal(db.getMaxListeners(), 10, 'Should set max listeners to 10');
        
        done();
    });
    
    })