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
    
    // Helper function to simulate async delete operation
    function deleteKey(store, key) {
        return q.Promise(function(resolve) {
            setTimeout(function() {
                if (store.hasOwnProperty(key)) {
                    delete store[key];
                    resolve(true);
                } else {
                    resolve(false);
                }
            }, 10); // Small delay to simulate async operation
        });
    }
    
    it('should delete multiple keys sequentially', function(done) {
        deleteKey(dataStore, 'key1')
            .then(function(result1) {
                assert.strictEqual(result1, true, 'First delete should succeed');
                return deleteKey(dataStore, 'key2');
            })
            .then(function(result2) {
                assert.strictEqual(result2, true, 'Second delete should succeed');
                return deleteKey(dataStore, 'key1'); // Try to delete already deleted key
            })
            .then(function(result3) {
                assert.strictEqual(result3, false, 'Delete of already deleted key should return false');
                done();
            })
            .catch(done);
    });
});