let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q promise tap method', function() {
        
        it('should pass through resolved value unaffected', function(done) {
            let originalValue = 'test value';
            let tappedValue = null;
            
            q.resolve(originalValue)
                .tap(function(value) {
                    tappedValue = value;
                })
                .then(function(value) {
                    assert.strictEqual(value, originalValue, 'Original value should be passed through');
                    assert.strictEqual(tappedValue, originalValue, 'Tap callback should receive the value');
                    done();
                })
                .catch(done);
        });

    });
});