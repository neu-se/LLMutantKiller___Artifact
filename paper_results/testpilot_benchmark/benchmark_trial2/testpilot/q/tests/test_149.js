let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.post - successful method call', function(done) {
        // Create a mock object with a method that takes arguments
        let mockObject = {
            calculate: function(a, b, callback) {
                // Simulate async operation
                setTimeout(() => {
                    callback(null, a + b);
                }, 10);
            }
        };
        
        // Convert to promise-based object
        let promiseObject = q.makePromise(mockObject);
        
        // Test the post method
        promiseObject.post('calculate', [5, 3])
            .then(result => {
                assert.strictEqual(result, 8);
                done();
            })
            .catch(done);
    });
    
    })