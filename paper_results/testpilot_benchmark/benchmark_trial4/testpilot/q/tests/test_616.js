let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.spread with fulfilled array', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        promise.spread(function(a, b, c) {
            assert.equal(a, 1);
            assert.equal(b, 2);
            assert.equal(c, 3);
            done();
        }, function(error) {
            done(error);
        });
        
        deferred.resolve([1, 2, 3]);
    });
});