let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.npost with successful callback', function(done) {
        // Create a mock object with a method that uses Node.js callback pattern
        let mockObject = {
            getData: function(arg1, arg2, callback) {
                // Simulate async operation
                setTimeout(() => {
                    callback(null, `result: ${arg1} + ${arg2}`);
                }, 10);
            }
        };

        q.npost(mockObject, 'getData', ['hello', 'world'])
            .then(function(result) {
                assert.strictEqual(result, 'result: hello + world');
                done();
            })
            .catch(done);
    });

    })