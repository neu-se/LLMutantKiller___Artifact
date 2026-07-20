let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nodeify with rejected promise', function(done) {
        let error = new Error('test error');
        let promise = q.reject(error);
        q.nodeify(promise, function(err, result) {
            assert.strictEqual(err, error);
            assert.strictEqual(result, undefined);
            done();
        });
    });

    })