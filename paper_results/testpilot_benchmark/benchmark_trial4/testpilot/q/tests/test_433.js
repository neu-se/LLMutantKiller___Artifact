let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.toString returns string type', function(done) {
        let promise = q.makePromise();
        let result = promise.toString();
        
        assert.strictEqual(typeof result, 'string');
        assert.strictEqual(result.length, 15); // "[object Promise]" has 15 characters
        done();
    });
});