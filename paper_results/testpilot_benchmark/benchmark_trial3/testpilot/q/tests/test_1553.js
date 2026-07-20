let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.async with yielding promises', function(done) {
        const asyncFn = q.async(function* () {
            const a = yield q.resolve(10);
            const b = yield q.resolve(20);
            return a + b;
        });
        
        asyncFn().then(function(result) {
            assert.equal(result, 30);
            done();
        }).catch(done);
    });
});