let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.invoke - successful method call', function(done) {
        // Create a test object with methods
        let testObj = {
            add: function(a, b) {
                return a + b;
            },
            greet: function(name) {
                return 'Hello, ' + name;
            }
        };
        
        // Create a promise-wrapped version of the add method
        let addPromise = q.fcall(testObj.add, 5, 3);
        
        // Test the promise
        addPromise
            .then(function(result) {
                assert.equal(result, 8);
                done();
            })
            .catch(done);
    });
});