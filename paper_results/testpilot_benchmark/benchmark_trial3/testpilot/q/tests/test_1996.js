let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.catch with rejected promise', function(done) {
        let rejectedPromise = q.reject(new Error('Test error'));
        
        rejectedPromise.catch(function(error) {
            assert.strictEqual(error.message, 'Test error');
            done();
        });
    });
});