let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.tap - should handle tap callback returning a promise', function(done) {
        let tapPromiseResolved = false;
        
        q.resolve('original')
            .tap(function(value) {
                return q.delay(10).then(function() {
                    tapPromiseResolved = true;
                    return 'tap promise result';
                });
            })
            .then(function(result) {
                assert.strictEqual(tapPromiseResolved, true, 'tap promise should be resolved');
                assert.strictEqual(result, 'original', 'should pass through original value even when tap returns promise');
                done();
            })
            .catch(done);
    });
});