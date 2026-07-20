let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should handle a promise as input and return it unchanged', function(done) {
        let originalPromise = q('nested promise');
        let wrappedPromise = q(originalPromise);
        
        wrappedPromise.then(function(result) {
            assert.strictEqual(result, 'nested promise');
            done();
        }).catch(done);
    });
});