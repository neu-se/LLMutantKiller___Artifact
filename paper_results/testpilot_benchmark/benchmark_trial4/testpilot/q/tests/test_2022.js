let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.progress with undefined progress handler', function(done) {
        let deferred = q.defer();
        
        // Should not throw error when progress handler is undefined
        deferred.promise.progress(undefined).then(function(result) {
            assert.equal(result, 'success');
            done();
        }).catch(done);
        
        setTimeout(() => {
            deferred.notify('some progress');
            deferred.resolve('success');
        }, 10);
    });
});