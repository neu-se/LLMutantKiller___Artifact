let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.isPending - initially pending', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        assert.strictEqual(promise.isPending(), true, 'Promise should be pending initially');
        done();
    });
});