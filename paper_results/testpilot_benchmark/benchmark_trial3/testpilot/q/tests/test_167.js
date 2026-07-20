let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should return a promise object', function() {
        const promise = q.Promise((resolve, reject) => {
            resolve('test');
        });
        
        assert(q.isPromise(promise), 'Should return a promise object');
        assert(typeof promise.then === 'function', 'Promise should have then method');
        assert(typeof promise.catch === 'function', 'Promise should have catch method');
    });
});