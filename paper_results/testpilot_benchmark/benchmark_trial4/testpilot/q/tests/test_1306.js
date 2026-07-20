let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.when with promise that resolves', function(done) {
        let promise = q.resolve('hello world');
        q.when(promise, function(value) {
            assert.equal(value, 'hello world');
            done();
        }, function(error) {
            done(error);
        });
    });

    })