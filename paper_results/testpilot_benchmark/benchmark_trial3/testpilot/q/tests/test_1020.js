let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.finally', function() {
        
        it('should preserve resolved value even if finally callback returns a value', function(done) {
            let originalValue = 'original';
            
            q.resolve(originalValue)
                .finally(function() {
                    return 'different value';
                })
                .then(function(value) {
                    assert.strictEqual(value, originalValue, 'Original value should be preserved');
                    done();
                })
                .catch(done);
        });

    });
});