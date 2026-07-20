let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.done with non-promise object', function(done) {
        let plainValue = 'plain string';
        
        // Q.when() can handle both promises and plain values
        q.when(plainValue).then(function(value) {
            assert.equal(value, 'plain string');
            done();
        }).catch(done);
    });
});