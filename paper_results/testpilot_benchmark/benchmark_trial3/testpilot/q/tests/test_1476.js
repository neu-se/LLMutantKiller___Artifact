let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fulfill - method invocation', function(done) {
        let obj = {
            value: 10,
            multiply: function(factor) {
                return this.value * factor;
            }
        };
        let promise = q.fulfill(obj);
        
        q.post(promise, 'multiply', [5]).then(function(result) {
            assert.strictEqual(result, 50);
            done();
        }).catch(done);
    });
});