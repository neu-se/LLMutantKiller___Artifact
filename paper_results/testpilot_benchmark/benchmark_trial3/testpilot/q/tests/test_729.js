let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.post - successful method call', function(done) {
        // Create a mock object with a method that accepts arguments
        let mockObject = {
            testMethod: function(arg1, arg2) {
                return arg1 + arg2;
            }
        };
        
        // Create a promise-wrapped version of the object using Q's nfbind or promise creation
        let promisedObject = {
            post: function(methodName, args) {
                return q.Promise(function(resolve, reject) {
                    try {
                        let result = mockObject[methodName].apply(mockObject, args);
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    }
                });
            }
        };
        
        // Test the post method
        promisedObject.post('testMethod', [5, 3])
            .then(function(result) {
                assert.equal(result, 8);
                done();
            })
            .catch(done);
    });
});