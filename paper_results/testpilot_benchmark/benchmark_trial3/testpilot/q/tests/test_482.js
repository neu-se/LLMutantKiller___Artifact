let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.tap', function() {
        it('should reject if callback returns a rejected promise', function(done) {
            let errorMessage = 'async callback error';
            
            q.resolve('test')
                .tap(function(value) {
                    return q.reject(new Error(errorMessage));
                })
                .then(function(result) {
                    done(new Error('Promise should have been rejected'));
                })
                .catch(function(error) {
                    assert.strictEqual(error.message, errorMessage);
                    done();
                });
        });

            })
})