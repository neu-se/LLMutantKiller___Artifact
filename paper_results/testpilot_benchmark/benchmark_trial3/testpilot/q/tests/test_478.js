let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.tap', function() {
        it('should pass through the original value when callback succeeds', function(done) {
            let originalValue = 'test value';
            let tappedValue = null;
            
            q.resolve(originalValue)
                .tap(function(value) {
                    tappedValue = value;
                    return 'different value'; // This should be ignored
                })
                .then(function(result) {
                    assert.strictEqual(result, originalValue, 'Original value should be passed through');
                    assert.strictEqual(tappedValue, originalValue, 'Callback should receive original value');
                    done();
                })
                .catch(done);
        });

            })
})