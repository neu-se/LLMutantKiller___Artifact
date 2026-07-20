let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.post with error handling', function(done) {
        let errorObject = {
            post: function(name, args) {
                return q.reject(new Error('Test error'));
            }
        };
        
        errorObject.post('failMethod', [])
            .then(function() {
                done(new Error('Should have thrown an error'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'Test error');
                done();
            });
    });
});