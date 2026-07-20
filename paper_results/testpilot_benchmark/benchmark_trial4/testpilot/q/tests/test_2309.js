let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.npost with no arguments', function(done) {
        // Create a mock object with a method that takes no arguments except callback
        let mockObject = {
            getConstant: function(callback) {
                setTimeout(() => {
                    callback(null, 42);
                }, 10);
            }
        };

        q.npost(mockObject, 'getConstant', [])
            .then(function(result) {
                assert.strictEqual(result, 42);
                done();
            })
            .catch(done);
    });
});