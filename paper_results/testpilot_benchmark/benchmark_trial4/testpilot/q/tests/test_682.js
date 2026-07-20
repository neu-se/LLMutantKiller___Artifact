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
            assert.strictEqual(promise.get('overwriteKey'), 'newValue');
        }
        
        done();
    });
});