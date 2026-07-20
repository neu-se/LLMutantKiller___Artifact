let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nodeify with promise that resolves to null', function(done) {
        let promise = q.resolve(null);
        q.nodeify(promise, function(err, result) {
            assert.strictEqual(err, null);
            assert.strictEqual(result, null);
            done();
        });
    });

    })