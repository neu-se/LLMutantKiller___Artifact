let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.all with promises that resolve to same value', function(done) {
        let promise1 = q.resolve(42);
        let promise2 = q.resolve(42);
        
        q.all([promise1, promise2]).then(function(result) {
            assert.deepStrictEqual(result, [42, 42]);
            done();
        }).catch(done);
    });
});