let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fbind - with context binding', function(done) {
        let obj = {
            value: 10,
            multiply: function(a, b) {
                return this.value * a * b;
            }
        };
        
        let promise = q.resolve(obj.multiply);
        let boundFunction = promise.fbind(2);
        
        // Call with specific context
        boundFunction.call(obj, 3).then(function(result) {
            assert.equal(result, 60); // 10 * 2 * 3 = 60
            done();
        }).catch(done);
    });
});