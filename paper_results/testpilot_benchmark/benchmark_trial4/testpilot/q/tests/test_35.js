let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should return a promise for an immediate value', function(done) {
        let value = 42;
        let promise = q(value);
        
        assert(q.isPromise(promise), 'q() should return a promise');
        
        promise.then(function(result) {
            assert.strictEqual(result, value, 'Promise should resolve to the original value');
            done();
        }).catch(done);
    });

    })