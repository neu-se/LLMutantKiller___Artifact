let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fcall with successful function', function(done) {
        // Create a simple function that adds two numbers
        function add(a, b) {
            return a + b;
        }
        
        // Test fcall with arguments using Q's fcall method
        q.fcall(add, 5, 3)
            .then(function(result) {
                assert.strictEqual(result, 8);
                done();
            })
            .catch(done);
    });
});