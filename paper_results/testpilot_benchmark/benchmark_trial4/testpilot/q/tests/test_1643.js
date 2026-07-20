let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.dispatch with non-existent method', function(done) {
        let testObject = {
            someMethod: function() {
                return 'test';
            }
        };
        
        q.dispatch(testObject, 'nonExistentMethod', [])
            .then(function(result) {
                done(new Error('Should have thrown an error'));
            })
            .catch(function(error) {
                assert(error instanceof Error);
                done();
            });
    });
});