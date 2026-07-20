let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.dispatch with method that throws error', function(done) {
        let testObject = {
            errorMethod: function() {
                throw new Error('Test error');
            }
        };
        
        q.dispatch(testObject, 'errorMethod', [])
            .then(function(result) {
                done(new Error('Should have caught the thrown error'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'Test error');
                done();
            });
    });
});