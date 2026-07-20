let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.join with rejected promise', function(done) {
        let rejectedPromise = q.reject(new Error('Test error'));
        
        q.join(rejectedPromise, 'anything').then(function(result) {
            done(new Error('Expected rejection but got fulfillment'));
        }).catch(function(error) {
            assert.strictEqual(error.message, 'Test error');
            done();
        });
    });
});