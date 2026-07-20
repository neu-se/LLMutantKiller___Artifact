let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    let promiseObj;
    
    beforeEach(function() {
        // Create a custom object that wraps data and provides promise-based delete method
        let data = {
            key1: 'value1',
            key2: 'value2',
            key3: 'value3'
        };
        
        promiseObj = {
            delete: function(key) {
                return q.Promise(function(resolve, reject) {
                    if (key === null || key === undefined) {
                        resolve(false);
                    } else if (data.hasOwnProperty(key)) {
                        delete data[key];
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
            },
            getData: function() {
                return data;
            }
        };
    });
    
    it('should handle deletion with null key', function(done) {
        promiseObj.delete(null)
            .then(function(result) {
                assert.strictEqual(result, false, 'Delete should return false for null key');
                done();
            })
            .catch(done);
    });
    
});