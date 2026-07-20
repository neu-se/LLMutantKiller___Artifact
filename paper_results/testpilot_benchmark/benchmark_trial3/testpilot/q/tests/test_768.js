let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test fapply error handling', function(done) {
        let errorFunction = function(shouldThrow) {
            if (shouldThrow) {
                throw new Error('Test error');
            }
            return 'success';
        };
        
        let promise = q(errorFunction);
        promise.fapply([true])
            .then(function() {
                done(new Error('Should have thrown an error'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'Test error');
                done();
            });
    });
});