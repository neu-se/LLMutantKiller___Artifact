let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.spread without rejected handler', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        promise.spread(function(a, b) {
            assert.equal(a, 'foo');
            assert.equal(b, 'bar');
            done();
        });
        
        deferred.resolve(['foo', 'bar']);
    });
});