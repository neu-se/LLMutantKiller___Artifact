let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.invoke with method that returns a value', function(done) {
        const testObject = {
            greet: function(name, greeting) {
                return greeting + ', ' + name + '!';
            }
        };
        
        q.invoke(testObject, 'greet', 'Alice', 'Hello')
            .then(function(result) {
                assert.equal(result, 'Hello, Alice!');
                done();
            })
            .catch(done);
    });
});