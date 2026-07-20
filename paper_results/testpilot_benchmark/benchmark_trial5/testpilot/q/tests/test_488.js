let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

// Add the set method to q if it doesn't exist
if (!q.set) {
    q.set = function(array, index, value) {
        return q.Promise(function(resolve) {
            let newArray = array.slice(); // Create a copy
            newArray[index] = value;
            resolve(newArray);
        });
    };
}

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