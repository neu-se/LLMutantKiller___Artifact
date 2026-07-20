let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.all - handles mixed resolved and pending promises', function(done) {
        let promise1 = q.resolve(42);
        let deferred = q.defer();
        let promise2 = deferred.promise;
        
        // Resolve the deferred promise after a short delay
        setTimeout(function() {
            deferred.resolve('delayed');
        }, 10);
        
        let mainPromise = q.resolve();
        mainPromise.all([promise1, promise2])
            .then(function(results) {
                assert.deepEqual(results, [42, 'delayed']);
                done();
            })
            .catch(done);
    });
});