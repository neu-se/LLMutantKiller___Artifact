let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.catch handler throws error', function(done) {
        let rejectedPromise = q.reject(new Error('Original error'));
        
        rejectedPromise.catch(function(error) {
            throw new Error('New error from catch handler');
        }).catch(function(error) {
            assert.strictEqual(error.message, 'New error from catch handler');
            done();
        });
    });
});