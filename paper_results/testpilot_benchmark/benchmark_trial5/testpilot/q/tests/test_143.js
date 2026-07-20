let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    let dataStore;
    
    beforeEach(function() {
        // Create a fresh data store for each test
        dataStore = {
            key1: 'value1',
            key2: 'value2',
            key3: 'value3'
        };
    });
    
    // Helper functions that return promises
    function setKey(key, value) {
        return q.Promise(function(resolve, reject) {
            try {
                dataStore[key] = value;
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    }
    
    function deleteKey(key) {
        return q.Promise(function(resolve, reject) {
            try {
                if (key in dataStore) {
                    delete dataStore[key];
                    resolve(true);
                } else {
                    resolve(false);
                }
            } catch (error) {
                reject(error);
            }
        });
    }
    
    it('should handle deletion with empty string key', function(done) {
        // First add an empty string key
        setKey('', 'emptyKeyValue')
            .then(function() {
                return deleteKey('');
            })
            .then(function(result) {
                assert.strictEqual(result, true, 'Delete should return true for empty string key');
                done();
            })
            .catch(done);
    });
});