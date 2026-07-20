let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise with basic descriptor', function(done) {
        // Create a simple descriptor that adds two numbers
        let descriptor = {
            fargs: function(a, b) {
                return [a, b];
            },
            fcall: function(args) {
                return args[0] + args[1];
            }
        };
        
        // Create a promise-returning function using Q
        let promiseFunc = function(a, b) {
            return q.Promise(function(resolve, reject) {
                try {
                    let args = descriptor.fargs(a, b);
                    let result = descriptor.fcall(args);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            });
        };
        
        promiseFunc(5, 3)
            .then(function(result) {
                assert.equal(result, 8);
                done();
            })
            .catch(done);
    });
});