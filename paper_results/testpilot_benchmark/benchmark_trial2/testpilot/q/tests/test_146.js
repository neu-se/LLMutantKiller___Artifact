let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    let promiseObj;
    
    beforeEach(function() {
        // Create a fresh object for each test (not a promise)
        promiseObj = {
            key1: 'value1',
            key2: 'value2',
            key3: 'value3',
            delete: function(key) {
                if (key === null || key === undefined) {
                    return q.resolve(false);
                }
                if (this.hasOwnProperty(key)) {
                    delete this[key];
                    return q.resolve(true);
                }
                return q.resolve(false);
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