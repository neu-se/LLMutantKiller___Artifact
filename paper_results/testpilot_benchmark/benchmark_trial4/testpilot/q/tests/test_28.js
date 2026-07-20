let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should return the same promise if value is already a Promise', function(done) {
        let originalPromise = q.resolve(42);
        let result = q(originalPromise);
        
        assert.strictEqual(result, originalPromise);
        done();
    });
});