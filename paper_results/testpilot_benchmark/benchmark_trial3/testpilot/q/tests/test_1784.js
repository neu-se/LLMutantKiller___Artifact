let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.invoke with non-existent method', function(done) {
        let testObject = {};
        
        q.invoke(testObject, 'nonExistentMethod')
            .then(function() {
                done(new Error('Should have failed for non-existent method'));
            })
            .catch(function(error) {
                assert(error instanceof Error);
                done();
            });
    });
});