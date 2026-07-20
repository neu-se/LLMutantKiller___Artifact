let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test fapply equivalent to direct function call', function(done) {
        let testFunc = function(a, b) {
            return a + ' ' + b;
        };
        
        // Direct call
        let directResult = testFunc('hello', 'world');
        
        // Promise call with fapply
        let promise = q(testFunc);
        promise.fapply(['hello', 'world'])
            .then(function(promiseResult) {
                assert.equal(promiseResult, directResult);
                assert.equal(promiseResult, 'hello world');
                done();
            })
            .catch(done);
    });
});