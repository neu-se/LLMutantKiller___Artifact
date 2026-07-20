let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.then - basic fulfillment', function(done) {
        let promise = q.resolve(42);
        promise.then(function(value) {
            assert.equal(value, 42);
            done();
        }, function(error) {
            done(error);
        });
    });

    })