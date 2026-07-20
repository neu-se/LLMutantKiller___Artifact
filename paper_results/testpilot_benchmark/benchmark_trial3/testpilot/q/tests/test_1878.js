let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fbind with function that throws error', function(done) {
        function throwError() {
            throw new Error('Test error');
        }
        
        let boundThrow = q.fbind(throwError);
        let result = boundThrow();
        
        q.when(result).then(function() {
            done(new Error('Should have thrown'));
        }).catch(function(error) {
            assert.equal(error.message, 'Test error');
            done();
        });
    });
});