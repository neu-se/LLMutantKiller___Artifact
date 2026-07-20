let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    let promiseObj;
    
    beforeEach(function() {
        // Create a simple key-value store with promise-based methods
        let store = {
            key1: 'value1',
            key2: 'value2',
            key3: 'value3'
        };
        
        promiseObj = {
            set: function(key, value) {
                let deferred = q.defer();
                store[key] = value;
                deferred.resolve(true);
                return deferred.promise;
            },
            delete: function(key) {
                let deferred = q.defer();
                if (key in store) {
                    delete store[key];
                    deferred.resolve(true);
                } else {
                    deferred.resolve(false);
                }
                return deferred.promise;
            }
        };
    });
    
    it('should handle deletion with empty string key', function(done) {
        // First add an empty string key
        promiseObj.set('', 'emptyKeyValue')
            .then(function() {
                return promiseObj.delete('');
            })
            .then(function(result) {
                assert.strictEqual(result, true, 'Delete should return true for empty string key');
                done();
            })
            .catch(done);
    });
});