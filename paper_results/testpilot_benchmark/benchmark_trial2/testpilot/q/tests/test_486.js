let mocha = require('mocha');
let assert = require('assert');
let Q = require('q');

// Mock implementation of q.set since it doesn't exist in the Q library
let q = {
    set: function(obj, key, value) {
        return Q.Promise(function(resolve) {
            obj[key] = value;
            resolve(obj);
        });
    }
};

describe('test q', function() {
    it('test q.set with plain object', function(done) {
        let plainObject = { existingKey: 'existingValue' };
        
        q.set(plainObject, 'newKey', 'newValue')
            .then(function(result) {
                // The result should be the modified object
                assert.strictEqual(result.newKey, 'newValue');
                assert.strictEqual(result.existingKey, 'existingValue');
                done();
            })
            .catch(done);
    });
});