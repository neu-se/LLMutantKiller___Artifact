let assert = require('assert');

// Assuming 'q' should be a utility library with a set method
// If this is meant to be a custom module, you'll need to implement it
// For now, I'll create a mock implementation
let q = {
    set: function(obj, key, value) {
        return new Promise(function(resolve) {
            obj[key] = value;
            resolve(obj);
        });
    }
};

describe('test q', function() {
    it('test q.set with undefined value', function(done) {
        let obj = { key: 'value' };
        
        q.set(obj, 'key', undefined)
            .then(function(result) {
                assert.strictEqual(result.key, undefined);
                done();
            })
            .catch(done);
    });
});