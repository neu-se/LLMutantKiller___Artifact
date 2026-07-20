let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.spread with non-array value', function(done) {
        let promise = q.resolve('not an array');
        
        q.spread(promise, function() {
            // Should still call fulfilled handler even with non-array
            assert.equal(arguments.length, 0);
            done();
        }, function(error) {
            done(error);
        });
    });
});