let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.post with non-existent method', function(done) {
        let testObject = {};
        
        q.post(testObject, 'nonExistentMethod', [])
            .then(function(result) {
                done(new Error('Should have thrown an error'));
            })
            .catch(function(error) {
                assert(error instanceof TypeError);
                done();
            });
    });
});