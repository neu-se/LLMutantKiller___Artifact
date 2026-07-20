let assert = require('assert');
let Q = require('q');

describe('test q', function() {
    it('test Q.any - resolves with first fulfilled promise', function(done) {
        let deferred1 = Q.defer();
        let deferred2 = Q.defer();
        let deferred3 = Q.defer();
        
        let promises = [deferred1.promise, deferred2.promise, deferred3.promise];
        
        Q.any(promises).then(function(result) {
            assert.equal(result, 'second');
            done();
        }).catch(done);
        
        // Reject first, fulfill second, third pending
        setTimeout(() => deferred1.reject(new Error('first failed')), 10);
        setTimeout(() => deferred2.resolve('second'), 20);
        setTimeout(() => deferred3.resolve('third'), 30);
    });
});