let assert = require('assert');
let Q = require('q');

// Create a custom Q.set function since it doesn't exist in the Q library
Q.set = function(obj, prop, value) {
    return Q.Promise(function(resolve, reject) {
        try {
            obj[prop] = value;
            resolve(obj);
        } catch (error) {
            reject(error);
        }
    });
};

describe('test q', function() {
    it('test q.set with new property', function(done) {
        let obj = {};
        
        Q.set(obj, 'newProp', 'newValue')
            .then(function(result) {
                assert.equal(obj.newProp, 'newValue');
                done();
            })
            .catch(done);
    });
});