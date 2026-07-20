let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fapply with function that throws error', function(done) {
        function errorFunction() {
            throw new Error('test error');
        }
        
        q.fapply(errorFunction, [])
            .then(function(result) {
                done(new Error('Should have thrown an error'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'test error');
                done();
            });
    });
});