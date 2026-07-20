let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.finally - waits for returned promise to resolve', function(done) {
        let callbackResolved = false;
        let originalValue = 'original';
        
        q.resolve(originalValue)
            .finally(function() {
                return q.delay(10).then(function() {
                    callbackResolved = true;
                });
            })
            .then(function(value) {
                assert.strictEqual(callbackResolved, true, 'callback promise should have resolved');
                assert.strictEqual(value, originalValue, 'original value should be preserved');
                done();
            })
            .catch(done);
    });
});