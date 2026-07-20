let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.timeout', function() {
        
        it('should resolve when promise resolves before timeout', function(done) {
            let deferred = q.defer();
            let promise = deferred.promise.timeout(100);
            
            // Resolve the promise before timeout
            setTimeout(() => {
                deferred.resolve('success');
            }, 50);
            
            promise.then(function(value) {
                assert.equal(value, 'success');
                done();
            }).catch(done);
        });
        
    });
});