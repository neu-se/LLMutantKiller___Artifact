let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    let dataObj;
    
    beforeEach(function() {
        // Create a fresh data object for each test
        dataObj = {
            key1: 'value1',
            key2: 'value2',
            key3: 'value3'
        };
    });
    
    it('should delete an existing key successfully', function(done) {
        // Create a promise that deletes the key
        q.Promise.resolve()
            .then(function() {
                // Simulate delete operation
                if (dataObj.hasOwnProperty('key1')) {
                    delete dataObj.key1;
                    return true;
                } else {
                    return false;
                }
            })
            .then(function(result) {
                assert.strictEqual(result, true, 'Delete should return true for existing key');
                // Verify the key is actually deleted
                return q.Promise.resolve(dataObj.key1);
            })
            .then(function(value) {
                assert.strictEqual(value, undefined, 'Deleted key should return undefined');
                done();
            })
            .catch(done);
    });
});