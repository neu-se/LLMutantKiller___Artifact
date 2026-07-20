let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nodeify - success case', function(done) {
        let promise = q.resolve('test value');
        
        promise.nodeify(function(err, result) {
            assert.strictEqual(err, null);
            assert.strictEqual(result, 'test value');
            done();
        });
    });

    })