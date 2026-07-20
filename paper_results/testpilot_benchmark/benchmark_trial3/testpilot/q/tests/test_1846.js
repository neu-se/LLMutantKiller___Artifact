let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fcall with synchronous function returning value', function(done) {
        q.fcall(function() {
            return 42;
        }).then(function(result) {
            assert.equal(result, 42);
            done();
        }).catch(done);
    });
});