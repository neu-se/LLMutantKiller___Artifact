let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fulfill returns a promise', function() {
        let promise = q.fulfill('test');
        assert.strictEqual(typeof promise.then, 'function');
        assert.strictEqual(typeof promise.catch, 'function');
    });
});