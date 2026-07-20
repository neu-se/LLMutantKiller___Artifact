let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nodeify with multiple values', function(done) {
        let promise = q.resolve(['value1', 'value2']);
        promise.nodeify(function(err, result) {
            assert.strictEqual(err, null);
            assert.deepStrictEqual(result, ['value1', 'value2']);
            done();
        });
    });
});