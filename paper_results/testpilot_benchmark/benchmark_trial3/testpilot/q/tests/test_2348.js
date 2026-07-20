let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nodeify with promise that resolves to multiple values', function(done) {
        let promise = q.resolve(['value1', 'value2']);
        q.nodeify(promise, function(err, result) {
            assert.strictEqual(err, null);
            assert.deepStrictEqual(result, ['value1', 'value2']);
            done();
        });
    });

    })