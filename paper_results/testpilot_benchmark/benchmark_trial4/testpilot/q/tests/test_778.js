let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fcall with function that throws error', function(done) {
        // Create a function that throws an error
        function throwError() {
            throw new Error('Test error');
        }
        
        let promise = q.resolve(throwError);
        
        promise.fcall()
            .then(function() {
                done(new Error('Should have thrown an error'));
            })
            .catch(function(error) {
                assert.strictEqual(error.message, 'Test error');
                done();
            });
    });

    })