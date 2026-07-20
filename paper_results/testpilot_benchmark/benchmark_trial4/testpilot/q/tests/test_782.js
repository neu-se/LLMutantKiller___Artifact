let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fcall with rejected promise', function(done) {
        let rejectedPromise = q.reject(new Error('Promise rejected'));
        
        rejectedPromise.fcall('arg1', 'arg2')
            .then(function() {
                done(new Error('Should have been rejected'));
            })
            .catch(function(error) {
                assert.strictEqual(error.message, 'Promise rejected');
                done();
            });
    });
});