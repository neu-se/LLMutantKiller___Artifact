let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.isPending - should return false for immediately rejected promise', function() {
        let promise = q.reject(new Error('immediate error'));
        
        assert.strictEqual(promise.isPending(), false);
    });
});