let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.allSettled with all fulfilled promises', function(done) {
        let promise1 = q.resolve(10);
        let promise2 = q.resolve(20);
        let promise3 = q.resolve(30);
        
        q.allSettled([promise1, promise2, promise3]).then(function(results) {
            assert.equal(results.length, 3);
            
            results.forEach(function(result) {
                assert.equal(result.state, "fulfilled");
                assert(result.hasOwnProperty("value"));
                assert(!result.hasOwnProperty("reason"));
            });
            
            assert.equal(results[0].value, 10);
            assert.equal(results[1].value, 20);
            assert.equal(results[2].value, 30);
            
            done();
        }).catch(done);
    });
});