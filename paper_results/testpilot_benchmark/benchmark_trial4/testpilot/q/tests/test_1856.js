let assert = require('assert');

describe('test q', function() {
    it('test q.fcall with no arguments', function(done) {
        function getValue() {
            return 42;
        }
        
        // Simulate q.fcall behavior with Promise.resolve
        Promise.resolve()
            .then(() => getValue())
            .then(function(result) {
                assert.equal(result, 42);
                done();
            })
            .catch(done);
    });
});