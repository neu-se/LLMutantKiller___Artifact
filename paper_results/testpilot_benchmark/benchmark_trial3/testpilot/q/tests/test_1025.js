let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.finally - preserves original promise state when callback succeeds', function(done) {
        let originalValue = 42;
        
        q.resolve(originalValue)
            .finally(function() {
                return 'different value';
            })
            .then(function(value) {
                assert.strictEqual(value, originalValue, 'original resolved value should be preserved');
                done();
            })
            .catch(done);
    });
});