let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.invoke with multiple arguments', function(done) {
        let testObject = {
            concatenate: function(a, b, c, d) {
                return a + b + c + d;
            }
        };
        
        q.invoke(testObject, 'concatenate', 'Hello', ' ', 'World', '!')
            .then(function(result) {
                assert.equal(result, 'Hello World!');
                done();
            })
            .catch(done);
    });
});