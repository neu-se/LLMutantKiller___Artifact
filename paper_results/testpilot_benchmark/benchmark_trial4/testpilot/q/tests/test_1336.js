let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.thenResolve with undefined value', function(done) {
        let resolvedPromise = q.resolve('some value');
        
        q.thenResolve(resolvedPromise, undefined)
            .then(function(result) {
                assert.strictEqual(result, undefined);
                done();
            })
            .catch(done);
    });
});