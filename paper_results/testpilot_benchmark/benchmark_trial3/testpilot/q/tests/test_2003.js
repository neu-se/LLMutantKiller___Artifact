let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.catch with rejected promise', function(done) {
        let promise = q.reject(new Error('Test error'));
        let caughtError = null;
        
        promise.catch(function(error) {
            caughtError = error;
            return 'handled';
        }).then(function(result) {
            assert.strictEqual(result, 'handled');
            assert(caughtError instanceof Error);
            assert.strictEqual(caughtError.message, 'Test error');
            done();
        }).catch(done);
    });
});