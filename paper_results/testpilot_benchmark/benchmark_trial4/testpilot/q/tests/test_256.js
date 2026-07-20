let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.Promise.reject returns a promise', function() {
        let rejectedPromise = q.Promise.reject('test');
        assert(q.isPromise(rejectedPromise));
    });
});