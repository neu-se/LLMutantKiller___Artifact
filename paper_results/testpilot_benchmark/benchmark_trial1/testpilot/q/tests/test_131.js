let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    let promiseObj;
    
    beforeEach(function() {
        // Create a promise that resolves to an object
        promiseObj = q.resolve({
            key1: 'value1',
            key2: 'value2',
            key3: 'value3'
        });
    });
    
    it('should handle deletion with undefined key', function(done) {
        promiseObj
            .then(function(obj) {
                // Attempt to delete undefined key from the resolved object
                let result = delete obj[undefined];
                assert.strictEqual(result, true, 'Delete should return true even for undefined key');
                done();
            })
            .catch(done);
    });
});