let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nodeify with resolved promise', function(done) {
        let promise = q.resolve('success');
        q.nodeify(promise, function(err, result) {
            assert.strictEqual(err, null);
            assert.strictEqual(result, 'success');
            done();
        });
    });

    })