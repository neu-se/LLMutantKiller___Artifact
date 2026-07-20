let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.then', function() {
        
        it('should transform value through fulfilled callback', function(done) {
            let deferred = q.defer();
            let promise = deferred.promise;
            
            promise.then(function(value) {
                return value * 2;
            }).then(function(transformedValue) {
                assert.equal(transformedValue, 20);
                done();
            });
            
            deferred.resolve(10);
        });

    });
});