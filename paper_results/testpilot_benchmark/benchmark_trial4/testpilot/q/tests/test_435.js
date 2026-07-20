let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.toString returns same value for different promises', function(done) {
        let promise1 = q.makePromise();
        let promise2 = q.makePromise();
        
        // Both promises should return the same toString value
        assert.strictEqual(promise1.toString(), promise2.toString());
        assert.strictEqual(promise1.toString(), "[object Promise]");
        done();
    });
});