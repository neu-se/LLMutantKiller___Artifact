let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.thenResolve with rejected promise', function(done) {
        let promise = q.reject(new Error('initial error'));
        let newValue = 'replacement value';
        
        q.thenResolve(promise, newValue)
            .then(function(result) {
                assert.strictEqual(result, newValue);
                done();
            })
            .catch(done);
    });

    })