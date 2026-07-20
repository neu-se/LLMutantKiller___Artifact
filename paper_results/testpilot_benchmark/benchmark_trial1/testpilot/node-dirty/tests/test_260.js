let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('no-listeners', function() {
        // Create a dirty database instance
        let db = dirty();
        
        // Test with no listeners - assuming we're testing if the db has listeners
        let result1 = db.listenerCount && db.listenerCount() > 0;
        assert.strictEqual(result1, false, 'Should return false when no listeners');
        
        // Test with listeners
        db.on('has-listeners', function() {});
        let result2 = db.listenerCount && db.listenerCount() > 0;
        assert.strictEqual(result2, true, 'Should return true when listeners exist');
    });
});