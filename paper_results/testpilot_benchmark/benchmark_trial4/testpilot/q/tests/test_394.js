let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.all - same string values', function(done) {
        let promise1 = q.resolve("hello");
        let promise2 = q.resolve("hello");
        
        q.all([promise1, promise2])
            .then(function(result) {
                assert.strictEqual(result[0], "hello");
                assert.strictEqual(result[1], "hello");
                done();
            })
            .catch(done);
    });
});