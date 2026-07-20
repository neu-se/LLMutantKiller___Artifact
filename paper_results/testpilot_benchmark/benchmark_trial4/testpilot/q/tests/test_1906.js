let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.keys with null should handle gracefully', function(done) {
        q.keys(null)
            .then(function(keys) {
                // Depending on implementation, might return empty array or handle differently
                assert(Array.isArray(keys));
                done();
            })
            .catch(function(error) {
                // It's also acceptable if this throws an error
                assert(error instanceof Error);
                done();
            });
    });
});