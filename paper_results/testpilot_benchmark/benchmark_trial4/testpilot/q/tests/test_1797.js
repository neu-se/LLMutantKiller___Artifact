let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.invoke with method that returns a promise', function(done) {
        let testObject = {
            asyncMultiply: function(a, b) {
                return q.resolve(a * b);
            }
        };
        
        q.invoke(testObject, 'asyncMultiply', 4, 6)
            .then(function(result) {
                assert.equal(result, 24);
                done();
            })
            .catch(done);
    });
});