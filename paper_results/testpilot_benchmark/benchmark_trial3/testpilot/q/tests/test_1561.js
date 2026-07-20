let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.async with generator that yields resolved promises', function(done) {
        function* testGenerator() {
            let result1 = yield q.resolve(42);
            let result2 = yield q.resolve(result1 + 8);
            return result2;
        }
        
        let asyncFn = q.async(testGenerator);
        asyncFn().then(function(result) {
            assert.equal(result, 50);
            done();
        }).catch(done);
    });
});