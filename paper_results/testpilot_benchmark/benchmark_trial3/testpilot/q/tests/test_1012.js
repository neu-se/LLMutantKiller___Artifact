let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.finally', function() {
        
        it('should handle finally callback that returns a promise', function(done) {
            let originalValue = 'original';
            let finallyExecuted = false;
            
            q.resolve(originalValue)
                .finally(function() {
                    return q.delay(10).then(function() {
                        finallyExecuted = true;
                    });
                })
                .then(function(value) {
                    assert.strictEqual(finallyExecuted, true, 'Finally callback promise should resolve');
                    assert.strictEqual(value, originalValue, 'Original value should be preserved');
                    done();
                })
                .catch(done);
        });

            })
})