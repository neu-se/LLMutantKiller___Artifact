let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nodeify with promise that resolves to undefined', function(done) {
        let promise = q.resolve(undefined);
        q.nodeify(promise, function(err, result) {
            assert.strictEqual(err, null);
            assert.strictEqual(result, undefined);
            done();
        });
    });

    })