let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fulfill - function application', function(done) {
        let func = function(a, b) {
            return a + b;
        };
        let promise = q.fulfill(func);
        
        q.fapply(promise, [10, 20]).then(function(result) {
            assert.strictEqual(result, 30);
            done();
        }).catch(done);
    });
});