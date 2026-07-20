let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.race - resolves with first resolved promise', function(done) {
        let deferred1 = q.defer();
        let deferred2 = q.defer();
        let deferred3 = q.defer();
        
        let promises = [deferred1.promise, deferred2.promise, deferred3.promise];
        
        q.race(promises).then(function(result) {
            assert.equal(result, 'first');
            done();
        }).catch(done);
        
        // Resolve the second promise first
        setTimeout(() => deferred2.resolve('first'), 10);
        setTimeout(() => deferred1.resolve('second'), 20);
        setTimeout(() => deferred3.resolve('third'), 30);
    });
});