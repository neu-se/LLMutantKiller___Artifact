let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.dispatch with method call', function(done) {
        let testObject = {
            add: function(a, b) {
                return a + b;
            },
            multiply: function(a, b) {
                return a * b;
            }
        };
        
        // Use q.fcall or q.Promise.resolve to wrap the method call
        q.fcall(testObject.add.bind(testObject), 5, 3)
            .then(function(result) {
                assert.equal(result, 8);
                done();
            })
            .catch(done);
    });
    
});