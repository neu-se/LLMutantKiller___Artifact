let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.catch - should return a promise', function() {
        let promise = q.reject('error');
        let result = promise.catch(function() {});
        
        assert(q.isPromise(result));
    });

    })