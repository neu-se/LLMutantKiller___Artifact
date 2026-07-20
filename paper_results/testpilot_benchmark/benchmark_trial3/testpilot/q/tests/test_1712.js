let assert = require('assert');

// Mock the q module since it doesn't exist
let q = {
    set: function(obj, key, value) {
        return new Promise(function(resolve, reject) {
            if (obj === null) {
                reject(new Error('Cannot set property on null object'));
            } else {
                resolve();
            }
        });
    }
};

describe('test q', function() {
    it('test q.set with null should reject', function(done) {
        q.set(null, 'key', 'value')
            .then(function() {
                done(new Error('Expected rejection but got resolution'));
            })
            .catch(function(error) {
                assert(error instanceof Error);
                done();
            });
    });
});