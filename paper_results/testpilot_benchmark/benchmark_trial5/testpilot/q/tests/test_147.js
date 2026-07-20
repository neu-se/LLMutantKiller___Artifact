let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    let promiseObj;
    
    beforeEach(function() {
        // Create a fresh promise-wrapped object for each test
        let data = {
            key1: 'value1',
            key2: 'value2',
            key3: 'value3'
        };
        
        promiseObj = {
            delete: function(key) {
                return q.Promise(function(resolve) {
                    let existed = data.hasOwnProperty(key);
                    delete data[key];
                    resolve(existed);
                });
            },
            get: function(key) {
                return q.Promise(function(resolve) {
                    resolve(data[key]);
                });
            }
        };
    });
    
    it('should delete an existing key successfully', function(done) {
        promiseObj.delete('key1')
            .then(function(result) {
                assert.strictEqual(result, true, 'Delete should return true for existing key');
                // Verify the key is actually deleted
                return promiseObj.get('key1');
            })
            .then(function(value) {
                assert.strictEqual(value, undefined, 'Deleted key should return undefined');
                done();
            })
            .catch(done);
    });
    
});