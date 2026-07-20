let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.stopUnhandledRejectionTracking - function exists and is callable', function(done) {
        // Verify the function exists and can be called
        assert.strictEqual(typeof q.stopUnhandledRejectionTracking, 'function');
        
        try {
            let result = q.stopUnhandledRejectionTracking();
            // Function should not return anything (undefined)
            assert.strictEqual(result, undefined);
            done();
        } catch (error) {
            done(error);
        }
    });

    })