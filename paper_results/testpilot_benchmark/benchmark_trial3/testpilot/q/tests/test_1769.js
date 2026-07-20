let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.post with method call', function(done) {
        // Create a test object with a method
        let testObj = {
            add: function(a, b) {
                return a + b;
            },
            multiply: function(x, y) {
                return x * y;
            }
        };
        
        // Create a promise that resolves to our test object
        let promise = q.resolve(testObj);
        
        // Test calling the add method using q.post
        promise.post('add', [5, 3])
            .then(function(result) {
                assert.equal(result, 8);
                done();
            })
            .catch(done);
    });
});