let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.when with promise that rejects', function(done) {
        let promise = q.reject(new Error('test error'));
        q.when(promise, function(value) {
            done(new Error('Should not have resolved'));
        }, function(error) {
            assert.equal(error.message, 'test error');
            done();
        });
    });

    })