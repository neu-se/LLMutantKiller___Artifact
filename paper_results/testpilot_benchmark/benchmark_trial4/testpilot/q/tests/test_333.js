let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise error handling', function(done) {
        let descriptor = {
            fargs: function(shouldFail) {
                return [shouldFail];
            },
            fcall: function(args) {
                if (args[0]) {
                    throw new Error('Intentional error');
                }
                return 'success';
            }
        };
        
        let promiseFunc = q.makePromise(descriptor);
        
        promiseFunc(true)
            .then(function(result) {
                done(new Error('Should have rejected'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'Intentional error');
                done();
            });
    });

    })