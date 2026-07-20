let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.finally', function() {
        
        it('should call finally callback when promise resolves', function(done) {
            let finallyCalled = false;
            let resolvedValue = 'success';
            
            q.resolve(resolvedValue)
                .finally(function() {
                    finallyCalled = true;
                })
                .then(function(value) {
                    assert.strictEqual(finallyCalled, true, 'Finally callback should be called');
                    assert.strictEqual(value, resolvedValue, 'Original value should be preserved');
                    done();
                })
                .catch(done);
        });

    })
})