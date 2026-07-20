let assert = require('assert');

// Mock Q library with a set method that returns a promise
let Q = {
    set: function(obj, key, value) {
        return new Promise(function(resolve) {
            obj[key] = value;
            resolve(obj);
        });
    }
};

describe('test q', function() {
    it('test q.set with numeric key', function(done) {
        let obj = {};
        
        Q.set(obj, 123, 'numeric key')
            .then(function(result) {
                assert.equal(obj[123], 'numeric key');
                done();
            })
            .catch(done);
    });
});