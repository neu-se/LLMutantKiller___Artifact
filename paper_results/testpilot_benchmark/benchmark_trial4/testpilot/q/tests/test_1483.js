let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fulfill - post method applies function when name is null', function(done) {
        let testFunc = function(a, b) {
            return a + b;
        };
        let promise = q.fulfill(testFunc);
        
        promise.post(null, [5, 7]).then(function(result) {
            assert.strictEqual(result, 12);
            done();
        }).catch(done);
    });
});