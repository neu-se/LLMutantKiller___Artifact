let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

// Add the missing q.set method
q.set = function(array, index, value) {
    let deferred = q.defer();
    
    try {
        // Create a copy of the array to avoid mutating the original
        let result = array.slice();
        result[index] = value;
        deferred.resolve(result);
    } catch (error) {
        deferred.reject(error);
    }
    
    return deferred.promise;
};

describe('test q', function() {
    it('test q.set with array', function(done) {
        let array = [1, 2, 3];
        
        q.set(array, 1, 'modified')
            .then(function(result) {
                assert.strictEqual(result[1], 'modified');
                assert.strictEqual(result[0], 1);
                assert.strictEqual(result[2], 3);
                done();
            })
            .catch(done);
    });
});