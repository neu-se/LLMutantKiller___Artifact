let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.tap', function() {
        it('should wait for callback promise to resolve', function(done) {
            let callbackResolved = false;
            
            q.resolve('original')
                .tap(function(value) {
                    return q.delay(50).then(function() {
                        callbackResolved = true;
                        return 'callback result';
                    });
                })
                .then(function(result) {
                    assert.strictEqual(result, 'original', 'Original value should be preserved');
                    assert.strictEqual(callbackResolved, true, 'Callback promise should have resolved');
                    done();
                })
                .catch(done);
        });
    });
});