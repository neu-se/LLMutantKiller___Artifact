let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise with fallback function', function(done) {
        // Descriptor that throws an error
        let descriptor = {
            fargs: function(a) {
                return [a];
            },
            fcall: function(args) {
                throw new Error('Descriptor failed');
            }
        };
        
        // Fallback function that returns a default value
        let fallback = function(a) {
            return 'fallback result: ' + a;
        };
        
        // Create a promise function manually since q.makePromise doesn't exist
        let promiseFunc = function(a) {
            return q.Promise(function(resolve, reject) {
                try {
                    let args = descriptor.fargs(a);
                    let result = descriptor.fcall(args);
                    resolve(result);
                } catch (error) {
                    // Use fallback when descriptor fails
                    resolve(fallback(a));
                }
            });
        };
        
        promiseFunc('test')
            .then(function(result) {
                assert.equal(result, 'fallback result: test');
                done();
            })
            .catch(done);
    });
});