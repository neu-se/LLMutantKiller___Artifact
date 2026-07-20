let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.progress - no progress after rejection', function(done) {
        let deferred = q.defer();
        let progressValues = [];
        
        deferred.promise.progress(function(value) {
            progressValues.push(value);
        });
        
        deferred.notify('before reject');
        deferred.reject(new Error('rejected'));
        deferred.notify('after reject'); // This should not trigger progress
        
        setTimeout(function() {
            assert.deepEqual(progressValues, ['before reject']);
            done();
        }, 10);
    });
});