let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.progress - no progress after resolution', function(done) {
        let deferred = q.defer();
        let progressValues = [];
        
        deferred.promise.progress(function(value) {
            progressValues.push(value);
        });
        
        deferred.notify('before resolve');
        deferred.resolve('resolved');
        deferred.notify('after resolve'); // This should not trigger progress
        
        setTimeout(function() {
            assert.deepEqual(progressValues, ['before resolve']);
            done();
        }, 10);
    });
});