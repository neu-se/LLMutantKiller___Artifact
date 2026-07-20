let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.invoke with non-existent method', function(done) {
        let testObject = {};
        
        q.invoke(testObject, 'nonExistentMethod')
            .then(function() {
                done(new Error('Should have thrown an error'));
            })
            .catch(function(error) {
                assert(error instanceof TypeError);
                done();
            });
    });
});