let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.get with null object', function(done) {
        q.get(null, 'anyKey')
            .then(function(result) {
                // This should not happen, expecting an error
                done(new Error('Expected an error but got result: ' + result));
            })
            .catch(function(error) {
                // Expecting an error when trying to get property from null
                assert(error instanceof Error);
                done();
            });
    });
});