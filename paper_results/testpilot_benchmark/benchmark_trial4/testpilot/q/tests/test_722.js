let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q promise post method - successful method call', function(done) {
        // Create a mock object with a method that takes arguments
        let mockObject = {
            testMethod: function(arg1, arg2) {
                return arg1 + arg2;
            }
        };
        
        // Create a promise for the object
        let promisedObject = q(mockObject);
        
        // Test calling the method through promise chaining
        promisedObject
            .then(function(obj) {
                return obj.testMethod(5, 3);
            })
            .then(function(result) {
                assert.equal(result, 8);
                done();
            })
            .catch(done);
    });
});