let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.toString returns string type', function(done) {
        let promise = q.when(123);
        let result = promise.toString();
        
        assert.strictEqual(typeof result, 'string');
        assert.strictEqual(result, "[object Promise]");
        done();
    });
});