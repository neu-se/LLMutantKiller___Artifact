let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.done with plain value', function(done) {
        let plainValue = 42;
        
        // Use q.fcall to create a promise from a plain value
        q.fcall(function() {
            return plainValue;
        }).then(function(value) {
            assert.strictEqual(value, plainValue);
            done();
        }).catch(function(error) {
            done(error);
        });
    });
});