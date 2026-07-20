let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('should handle removing non-existent listener gracefully', function(done) {
        let db = dirty();
        
        function nonExistentListener() {}
        
        // Should not throw when removing a listener that was never added
        assert.doesNotThrow(() => {
            db.removeListener('non-existent-event', nonExistentListener);
        }, 'Should not throw when removing non-existent listener');
        
        done();
    });
    
    })