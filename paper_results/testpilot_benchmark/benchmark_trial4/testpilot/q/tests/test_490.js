let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.tap', function() {
        it('should reject if callback throws an error', function(done) {
            let errorMessage = 'callback error';
            
            q.resolve('test')
                .tap(function(value) {
                    throw new Error(errorMessage);
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