let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should coerce thenable objects to promises', function(done) {
        let thenable = {
            then: function(onFulfilled, onRejected) {
                setTimeout(() => onFulfilled('thenable result'), 10);
            }
        };
        
        let result = q(thenable);
        assert(q.isPromise(result), 'Result should be a promise');
        
        result.then(function(value) {
            assert.strictEqual(value, 'thenable result', 'Should resolve with thenable result');
            done();
        }).catch(done);
    });
});