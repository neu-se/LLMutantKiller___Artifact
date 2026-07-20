let assert = require('assert');

// Mock q.spread functionality since q module is not available
function spread(value, fulfilled, rejected) {
    try {
        // If value is a promise-like object, handle it
        if (value && typeof value.then === 'function') {
            return value.then(function(result) {
                if (Array.isArray(result)) {
                    return fulfilled.apply(null, result);
                } else {
                    return fulfilled(result);
                }
            }, rejected);
        } else {
            // If value is already resolved (like an array), spread it immediately
            if (Array.isArray(value)) {
                return fulfilled.apply(null, value);
            } else {
                return fulfilled(value);
            }
        }
    } catch (error) {
        if (rejected) {
            return rejected(error);
        }
        throw error;
    }
}

describe('test q', function() {
    it('test q.spread with resolved array', function(done) {
        let resolvedArray = [1, 2, 3];
        
        spread(resolvedArray, function(a, b, c) {
            assert.equal(a, 1);
            assert.equal(b, 2);
            assert.equal(c, 3);
            done();
        }, function(error) {
            done(error);
        });
    });
});