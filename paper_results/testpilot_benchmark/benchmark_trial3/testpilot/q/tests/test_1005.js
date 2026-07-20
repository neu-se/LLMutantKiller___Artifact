let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.finally - rejects if callback throws', function(done) {
        let callbackError = new Error('finally callback error');
        
        q.resolve('success')
            .finally(function() {
                throw callbackError;
            })
            .then(function() {
                done(new Error('Promise should have been rejected due to finally callback error'));
            })
            .catch(function(reason) {
                assert.strictEqual(reason, callbackError, 'should reject with callback error');
                done();
            });
    });

    })