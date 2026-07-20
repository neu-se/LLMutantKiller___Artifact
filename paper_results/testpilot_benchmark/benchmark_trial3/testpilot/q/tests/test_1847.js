let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fcall with no arguments', function(done) {
        function getValue() {
            return 42;
        }
        
        q.fcall(getValue)
            .then(function(result) {
                assert.equal(result, 42);
                done();
            })
            .catch(done);
    });
});