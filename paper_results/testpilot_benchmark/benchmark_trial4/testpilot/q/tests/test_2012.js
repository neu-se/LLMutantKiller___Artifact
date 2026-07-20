let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.catch with rejected promise', function(done) {
        let promise = q.reject(new Error('Test error'));
        let caughtError = null;
        
        q.catch(promise, function(error) {
            caughtError = error;
            return 'recovered';
        }).then(function(result) {
            assert.strictEqual(result, 'recovered');
            assert(caughtError instanceof Error);
            assert.strictEqual(caughtError.message, 'Test error');
            done();
        }).catch(done);
    });
});