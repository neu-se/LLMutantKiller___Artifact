let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.finally - rejection in finally callback propagates', function(done) {
        let finallyError = new Error('finally error');
        
        q.resolve('success')
            .finally(function() {
                throw finallyError;
            })
            .then(function() {
                done(new Error('Promise should have been rejected due to finally error'));
            })
            .catch(function(error) {
                assert.strictEqual(error, finallyError, 'finally error should be propagated');
                done();
            });
    });

    })