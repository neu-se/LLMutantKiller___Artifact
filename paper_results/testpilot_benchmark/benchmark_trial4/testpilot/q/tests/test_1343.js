let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.thenResolve with undefined value', function(done) {
        let promise = q.resolve('some value');
        
        promise.then(function() {
            return undefined;
        })
        .then(function(result) {
            assert.strictEqual(result, undefined);
            done();
        })
        .catch(done);
    });
});