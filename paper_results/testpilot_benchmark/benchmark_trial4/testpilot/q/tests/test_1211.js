let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.npost - successful method call', function(done) {
        // Create a mock object with a method that follows Node.js callback convention
        let mockObject = {
            testMethod: function(arg1, arg2, callback) {
                // Simulate async operation
                setTimeout(() => {
                    callback(null, arg1 + arg2);
                }, 10);
            }
        };
        
        // Create a promise-wrapped version of the object
        let promisedObject = q.makePromise(mockObject, function(name, args) {
            return mockObject[name].apply(mockObject, args);
        });
        
        // Test npost method
        promisedObject.npost('testMethod', [5, 3])
            .then(function(result) {
                assert.equal(result, 8);
                done();
            })
            .catch(done);
    });
    
    })