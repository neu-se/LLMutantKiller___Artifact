let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should handle already resolved promise as input', function(done) {
        let innerPromise = q('inner value');
        let outerPromise = q(innerPromise);
        outerPromise.then(function(result) {
            assert.strictEqual(result, 'inner value');
            done();
        }).catch(done);
    });
});