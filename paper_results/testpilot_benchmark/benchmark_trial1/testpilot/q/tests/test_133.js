let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    let promiseObj;
    
    beforeEach(function() {
        // Create a fresh promise object for each test
        promiseObj = q.resolve({
            key1: 'value1',
            key2: 'value2',
            key3: 'value3'
        });
    });
    
    it('should handle deletion of non-existing key', function(done) {
        promiseObj
            .then(function(obj) {
                // Attempt to delete a non-existing key
                let result = delete obj.nonExistentKey;
                assert.strictEqual(result, true, 'Delete operation should return true even for non-existing key');
                done();
            })
            .catch(done);
    });
    
});