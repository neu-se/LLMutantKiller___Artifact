let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise with async descriptor', function(done) {
        let descriptor = {
            fargs: function(text) {
                return [text];
            },
            fcall: function(args) {
                // Simulate async operation
                return q.delay(10).then(function() {
                    return args[0].toUpperCase();
                });
            }
        };
        
        let promiseFunc = q.makePromise(descriptor);
        
        promiseFunc('hello')
            .then(function(result) {
                assert.equal(result, 'HELLO');
                done();
            })
            .catch(done);
    });

    })