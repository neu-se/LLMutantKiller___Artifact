let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.get - should propagate rejection', function(done) {
        let rejectedPromise = q.reject(new Error('Test error'));
        
        rejectedPromise.get('anyKey').then(function() {
            done(new Error('Should not resolve'));
        }).catch(function(error) {
            assert.strictEqual(error.message, 'Test error');
            done();
        });
    });
});