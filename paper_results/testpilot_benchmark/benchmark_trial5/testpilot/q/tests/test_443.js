let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.return returns a promise', function() {
        let promise = q.return('test');
        assert.strictEqual(typeof promise.then, 'function');
        assert.strictEqual(typeof promise.catch, 'function');
    });
});