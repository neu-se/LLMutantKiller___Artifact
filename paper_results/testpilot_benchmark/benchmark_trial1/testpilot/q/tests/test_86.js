let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.tap', function() {
        it('should pass through the original value when callback succeeds', function(done) {
            let originalValue = 'test value';
            let callbackCalled = false;
            
            q.resolve(originalValue)
                .tap(function(value) {
                    callbackCalled = true;
                    assert.equal(value, originalValue);
                    return 'different value'; // This should be ignored
                })
                .then(function(result) {
                    assert.equal(result, originalValue); // Original value should pass through
                    assert.equal(callbackCalled, true);
                    done();
                })
                .catch(done);
        });

            })
})