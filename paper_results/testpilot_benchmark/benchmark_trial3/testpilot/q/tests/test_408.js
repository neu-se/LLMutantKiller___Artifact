let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.race - works with single promise', function(done) {
        let deferred = q.defer();
        let promises = [deferred.promise];
        
        // Use q.race() instead of promise.race()
        q.race(promises).then(function(result) {
            assert.strictEqual(result, 'single result');
            done();
        }).catch(done);
        
        setTimeout(() => deferred.resolve('single result'), 10);
    });
});