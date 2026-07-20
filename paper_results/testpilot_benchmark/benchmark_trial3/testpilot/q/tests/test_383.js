let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.join - should handle undefined values', function(done) {
        let promise1 = q.resolve(undefined);
        let promise2 = q.resolve(undefined);
        
        promise1.join(promise2)
            .then(function(result) {
                assert.strictEqual(result, undefined);
                done();
            })
            .catch(done);
    });

    })