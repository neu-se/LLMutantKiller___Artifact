let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.allSettled', function() {
        
        it('should handle delayed promises', function(done) {
            let deferred1 = q.defer();
            let deferred2 = q.defer();
            
            setTimeout(() => deferred1.resolve('delayed1'), 10);
            setTimeout(() => deferred2.reject(new Error('delayed2')), 20);
            
            q.allSettled([deferred1.promise, deferred2.promise])
                .then(function(results) {
                    assert.equal(results.length, 2);
                    assert.equal(results[0].state, 'fulfilled');
                    assert.equal(results[0].value, 'delayed1');
                    assert.equal(results[1].state, 'rejected');
                    assert.equal(results[1].reason.message, 'delayed2');
                    done();
                })
                .catch(done);
        });
    });
});