let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.all - resolves when all promises resolve', function(done) {
        let promise1 = q.resolve(1);
        let promise2 = q.resolve(2);
        let promise3 = q.resolve(3);
        
        let mainPromise = q.resolve([promise1, promise2, promise3]);
        
        mainPromise.all().then(function(results) {
            assert.deepEqual(results, [1, 2, 3]);
            done();
        }).catch(done);
    });
});