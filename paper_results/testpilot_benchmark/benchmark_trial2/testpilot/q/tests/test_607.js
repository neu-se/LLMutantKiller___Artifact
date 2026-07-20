let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.ninvoke with successful callback', function(done) {
        // Create a mock object with a method that follows Node.js callback convention
        const mockObject = {
            getData: function(arg1, arg2, callback) {
                // Simulate async operation
                setTimeout(() => {
                    callback(null, `result: ${arg1} + ${arg2}`);
                }, 10);
            }
        };

        q.ninvoke(mockObject, 'getData', 'hello', 'world')
            .then(result => {
                assert.strictEqual(result, 'result: hello + world');
                done();
            })
            .catch(done);
    });

    })