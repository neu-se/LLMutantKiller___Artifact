let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.spread with rejected promise', function(done) {
        let testError = new Error('test error');
        let promise = q.reject(testError);
        promise.spread(function() {
            done(new Error('Should not call fulfilled handler'));
        }, function(error) {
            assert.equal(error, testError);
            done();
        });
    });

    })