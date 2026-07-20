let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.getMaxListeners with default value', function(done) {
        // Create a new dirty database instance
        let db = dirty();
        
        // Test that getMaxListeners returns the default value (typically 10)
        let maxListeners = dirty.Dirty.getMaxListeners(db);
        assert(typeof maxListeners === 'number', 'getMaxListeners should return a number');
        assert(maxListeners >= 0, 'getMaxListeners should return a non-negative number');
        
        db.close();
        done();
    });

    })