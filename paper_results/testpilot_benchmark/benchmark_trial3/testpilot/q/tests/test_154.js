let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.defer.prototype.makeNodeResolver - error case', function(done) {
        let deferred = q.defer();
        let resolver = deferred.makeNodeResolver();
        
        // Simulate failed async operation
        setTimeout(() => {
            resolver(new Error('test error'));
        }, 10);
        
        deferred.promise.then(() => {
            done(new Error('Promise should have been rejected'));
        }).catch(err => {
            assert.strictEqual(err.message, 'test error');
            done();
        });
    });
});