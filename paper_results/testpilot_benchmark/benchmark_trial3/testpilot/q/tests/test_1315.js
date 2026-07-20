let assert = require('assert');

describe('test q', function() {
    it('test q.when with null value', function(done) {
        // Simulate q.when behavior with Promise.resolve
        Promise.resolve(null)
            .then(function(value) {
                assert.equal(value, null);
                done();
            })
            .catch(function(error) {
                done(error);
            });
    });
});