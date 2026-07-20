let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfapply - underlying promise rejection', function(done) {
        // Create a promise that rejects before nfapply is called
        let rejectedPromise = q.reject(new Error('Initial rejection'));
        
        rejectedPromise.nfapply(['arg1', 'arg2'])
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(err => {
                assert.strictEqual(err.message, 'Initial rejection');
                done();
            });
    });
});