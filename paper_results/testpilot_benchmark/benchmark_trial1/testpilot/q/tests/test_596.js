let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.npost with successful callback', function(done) {
        // Create a mock object with a method that uses Node.js callback pattern
        let mockObject = {
            testMethod: function(arg1, arg2, callback) {
                // Simulate async operation
                setTimeout(() => {
                    callback(null, arg1 + arg2);
                }, 10);
            }
        };

        q.npost(mockObject, 'testMethod', [5, 3])
            .then(function(result) {
                assert.strictEqual(result, 8);
                done();
            })
            .catch(done);
    });

    })