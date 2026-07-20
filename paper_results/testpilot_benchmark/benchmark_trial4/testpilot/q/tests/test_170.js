let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should return a promise object', function() {
        const promise = q.Promise((resolve) => {
            resolve('test');
        });
        
        assert(typeof promise.then === 'function');
        assert(typeof promise.catch === 'function');
    });

    })