let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.async with multiple yields', function(done) {
        const asyncFn = q.async(function* () {
            const step1 = yield q.resolve('hello');
            const step2 = yield q.resolve(' ');
            const step3 = yield q.resolve('world');
            return step1 + step2 + step3;
        });
        
        asyncFn().then(function(result) {
            assert.equal(result, 'hello world');
            done();
        }).catch(done);
    });
});