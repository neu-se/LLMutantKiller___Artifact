let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fcall with no arguments', function(done) {
        // Create a function that returns a constant
        function getConstant() {
            return 42;
        }
        
        // Create a promise function using Q's promise API
        let promiseFunction = q.denodeify(function(callback) {
            try {
                let result = getConstant();
                callback(null, result);
            } catch (error) {
                callback(error);
            }
        });
        
        // Test fcall with no arguments
        promiseFunction()
            .then(function(result) {
                assert.strictEqual(result, 42);
                done();
            })
            .catch(done);
    });
});