let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    let promiseObj;
    
    beforeEach(function() {
        // Create a fresh promise object for each test
        promiseObj = q.makePromise({
            key1: 'value1',
            key2: 'value2',
            key3: 'value3'
        });
    });
    
    it('should handle numeric keys', function(done) {
        promiseObj.set(123, 'numericKeyValue')
            .then(function() {
                return promiseObj.delete(123);
            })
            .then(function(result) {
                assert.strictEqual(result, true, 'Delete should work with numeric keys');
                done();
            })
            .catch(done);
    });
});