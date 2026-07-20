let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.thenReject - should work with object as reason', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        let errorObj = { message: 'test error', code: 500 };
        
        promise.thenReject(errorObj)
            .then(
                function(value) {
                    done(new Error('Promise should have been rejected'));
                },
                function(reason) {
                    assert.deepStrictEqual(reason, errorObj);
                    done();
                }
            );
        
        deferred.resolve('some value');
    });
});