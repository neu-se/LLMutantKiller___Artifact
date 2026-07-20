let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.join - both promises resolve', function(done) {
        let promise1 = q.resolve(42);
        let promise2 = q.resolve(42);
        
        promise1.join(promise2).then(function(result) {
            assert.strictEqual(result, 42);
            done();
        }).catch(done);
    });
});