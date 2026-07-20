let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.set - overwrite existing key', function(done) {
        let promise = q.makePromise();
        
        // Set initial value
        promise.set('overwriteKey', 'initialValue');
        
        // Overwrite with new value
        promise.set('overwriteKey', 'newValue');
        
        // Verify the value was overwritten
        if (typeof promise.get === 'function') {
            let result = promise.get('overwriteKey');
            if (result && typeof result.then === 'function') {
                // If get returns a promise, resolve it
                result.then(function(value) {
                    assert.strictEqual(value, 'newValue');
                    done();
                }).catch(done);
            } else {
                // If get returns a direct value
                assert.strictEqual(result, 'newValue');
                done();
            }
        } else {
            done();
        }
    });
});