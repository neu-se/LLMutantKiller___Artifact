let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.isPending - with Q.reject', function(done) {
        let promise = q.reject(new Error('immediate error'));
        
        assert.strictEqual(promise.isPending(), false, 'Promise created with Q.reject should not be pending');
        done();
    });
});