let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nodeify with no callback should not throw', function() {
        let promise = q.resolve('test');
        assert.doesNotThrow(function() {
            promise.nodeify();
        });
    });

    })