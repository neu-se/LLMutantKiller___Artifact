let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.done with rejected callback', function(done) {
        let testError = new Error('rejection test');
        let promise = q.reject(testError);
        
        q.done(promise, null, function(error) {
            assert.equal(error.message, 'rejection test');
            done();
        });
    });

    })