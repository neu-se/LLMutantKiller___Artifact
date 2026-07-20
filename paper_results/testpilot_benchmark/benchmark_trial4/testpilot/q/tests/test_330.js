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
        
        let promiseFunc = q.makePromise(descriptor, fallback);
        
        promiseFunc('test')
            .then(function(result) {
                assert.equal(result, 'fallback result: test');
                done();
            })
            .catch(done);
    });

    })