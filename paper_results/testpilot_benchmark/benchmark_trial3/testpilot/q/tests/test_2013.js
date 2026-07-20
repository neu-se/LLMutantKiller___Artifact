let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.progress with undefined progress handler', function(done) {
        let deferred = q.defer();
        
        // Should not throw error when progress handler is undefined
        deferred.promise.then(function(result) {
            assert.equal(result, 'test value');
            done();
        }, function(error) {
            done(error);
        }, undefined).catch(done); // undefined progress handler
        
        setTimeout(() => deferred.notify('some progress'), 10);
        setTimeout(() => deferred.resolve('test value'), 20);
    });
});