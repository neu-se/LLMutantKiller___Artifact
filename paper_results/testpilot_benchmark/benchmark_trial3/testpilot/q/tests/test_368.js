let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.passByCopy', function() {
        
        it('should work with rejected promises', function(done) {
            let error = new Error('test error');
            let promise = q.reject(error);
            let result = promise.passByCopy();
            
            assert.strictEqual(result, promise, 'passByCopy should work with rejected promises');
            
            result.catch(function(err) {
                assert.strictEqual(err, error, 'Promise rejection should be preserved');
                done();
            });
        });
        
    });
});