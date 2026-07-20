let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.thenResolve with delayed promise', function(done) {
        let promise = q.delay(10).then(() => 'delayed value');
        let newValue = 42;
        
        q.thenResolve(promise, newValue)
            .then(function(result) {
                assert.strictEqual(result, newValue);
                done();
            })
            .catch(done);
    });

    })