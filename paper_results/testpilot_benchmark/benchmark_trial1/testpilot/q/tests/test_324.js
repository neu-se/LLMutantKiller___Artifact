let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nbind - with thisArg and pre-bound arguments', function(done) {
        const calculator = {
            base: 100,
            operation: function(multiplier, addend, value, callback) {
                setTimeout(() => {
                    const result = this.base + (value * multiplier) + addend;
                    callback(null, result);
                }, 10);
            }
        };
        
        // Use q.nbind directly instead of q.makePromise
        const boundFunc = q.nbind(calculator.operation, calculator, 2, 10);
        
        boundFunc(5)
            .then(result => {
                assert.strictEqual(result, 120); // 100 + (5 * 2) + 10
                done();
            })
            .catch(done);
    });
});