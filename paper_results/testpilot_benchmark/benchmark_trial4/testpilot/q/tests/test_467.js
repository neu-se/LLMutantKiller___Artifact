let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.then', function() {
        
        it('should pass through value when no fulfilled callback provided', function(done) {
            let deferred = q.defer();
            let promise = deferred.promise;
            
            promise.then().then(function(value) {
                assert.equal(value, 'passed through');
                done();
            });
            
            deferred.resolve('passed through');
        });

    });
});