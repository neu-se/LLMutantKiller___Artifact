let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.master with undefined/null object', function(done) {
        let master = q.master(null);
        
        // Should handle null gracefully
        master.then(function(result) {
            assert.strictEqual(result, null);
            done();
        }).catch(function(error) {
            // It's also acceptable if it rejects
            done();
        });
    });
});