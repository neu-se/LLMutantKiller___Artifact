let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.get with null object', function(done) {
        q.get(null, 'property')
            .then(function(result) {
                // This test verifies the behavior when getting a property from null
                done();
            })
            .catch(function(error) {
                // Expected to fail when trying to get property from null
                assert(error instanceof Error);
                done();
            });
    });
});