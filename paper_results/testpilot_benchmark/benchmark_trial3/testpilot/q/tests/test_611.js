let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.spread without rejection handler', function(done) {
        // Test that rejection propagates when no rejection handler is provided
        q.all([q.resolve(1), q.reject(new Error('propagated error'))])
            .spread(function(a, b) {
                assert.fail('Should not reach fulfilled handler');
            })
            .then(
                function() {
                    assert.fail('Should not reach then handler');
                },
                function(error) {
                    assert.equal(error.message, 'propagated error');
                    done();
                }
            )
            .catch(done);
    });
});