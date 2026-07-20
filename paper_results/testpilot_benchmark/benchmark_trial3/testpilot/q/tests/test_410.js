let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.race - works with immediately resolved promises', function(done) {
        let promise1 = q.resolve('immediate1');
        let promise2 = q.resolve('immediate2');
        let deferred = q.defer();
        
        let promise = q([promise1, promise2, deferred.promise]);
        
        promise.race().then(function(result) {
            // Should resolve with one of the immediate values
            assert(result === 'immediate1' || result === 'immediate2');
            done();
        }).catch(done);
        
        setTimeout(() => deferred.resolve('delayed'), 100);
    });
});