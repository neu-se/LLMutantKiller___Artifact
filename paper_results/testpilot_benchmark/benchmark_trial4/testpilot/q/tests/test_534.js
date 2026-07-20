let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.thenReject - should reject even if original promise rejects', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        promise.thenReject('new error')
            .then(
                function(value) {
                    done(new Error('Promise should have been rejected'));
                },
                function(reason) {
                    assert.strictEqual(reason, 'new error');
                    done();
                }
            );
        
        deferred.reject('original error');
    });

    })