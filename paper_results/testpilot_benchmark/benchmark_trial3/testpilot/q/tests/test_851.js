let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.all - handles mixed values and promises', function(done) {
        let promise1 = q.resolve(1);
        let value2 = 2;
        let promise3 = q.delay(10).then(() => 3);
        
        let mainPromise = q.resolve([promise1, value2, promise3]);
        
        mainPromise.all().then(function(results) {
            assert.deepEqual(results, [1, 2, 3]);
            done();
        }).catch(done);
    });
});