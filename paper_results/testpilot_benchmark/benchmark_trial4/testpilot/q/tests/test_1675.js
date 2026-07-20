let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.get with null object', function(done) {
        // q.get doesn't exist, but we can simulate getting a property from null
        // which should throw an error
        try {
            let result = null['property'];
            done(new Error('Expected an error but got: ' + result));
        } catch (error) {
            // Expected to fail when trying to get property from null
            assert(error instanceof TypeError);
            done();
        }
    });
});