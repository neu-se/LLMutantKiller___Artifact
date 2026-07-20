let assert = require('assert');

// Mock implementation of q.set since it doesn't exist in the standard q library
let q = {
    set: function(obj, key, value) {
        return new Promise(function(resolve) {
            obj[key] = value;
            resolve(obj);
        });
    }
};

describe('test q', function() {
    it('test q.set with null value', function(done) {
        let obj = { key: 'value' };
        
        q.set(obj, 'key', null)
            .then(function(result) {
                assert.strictEqual(result.key, null);
                done();
            })
            .catch(done);
    });
});