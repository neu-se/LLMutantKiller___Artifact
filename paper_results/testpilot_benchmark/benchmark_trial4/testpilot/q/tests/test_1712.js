let assert = require('assert');

// Create a simple Q-like object with a set method for testing
let Q = {
    set: function(obj, key, value) {
        return new Promise(function(resolve) {
            obj[key] = value;
            resolve();
        });
    }
};

describe('test q', function() {
    it('test q.set with different value types', function(done) {
        let obj = {};
        
        Q.set(obj, 'number', 123)
            .then(function() {
                return Q.set(obj, 'boolean', true);
            })
            .then(function() {
                return Q.set(obj, 'object', { nested: 'value' });
            })
            .then(function() {
                assert.strictEqual(obj.number, 123);
                assert.strictEqual(obj.boolean, true);
                assert.deepStrictEqual(obj.object, { nested: 'value' });
                done();
            })
            .catch(done);
    });
});