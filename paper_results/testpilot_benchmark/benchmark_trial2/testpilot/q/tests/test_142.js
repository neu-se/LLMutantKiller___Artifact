let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    let promiseObj;
    
    beforeEach(function() {
        // Create a simple promise-based object with set/delete methods
        let data = {
            key1: 'value1',
            key2: 'value2',
            key3: 'value3'
        };
        
        promiseObj = {
            set: function(key, value) {
                return q.Promise(function(resolve) {
                    data[key] = value;
                    resolve();
                });
            },
            delete: function(key) {
                return q.Promise(function(resolve) {
                    if (key in data) {
                        delete data[key];
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
            },
            get: function(key) {
                return q.Promise(function(resolve) {
                    resolve(data[key]);
                });
            }
        };
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