let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.spawn with promise-yielding generator', function(done) {
        function* promiseGenerator() {
            let result1 = yield q.resolve(10);
            let result2 = yield q.resolve(20);
            return result1 + result2;
        }
        
        q.spawn(promiseGenerator)
            .then(function(result) {
                assert.equal(result, 30);
                done();
            })
            .catch(done);
    });
});