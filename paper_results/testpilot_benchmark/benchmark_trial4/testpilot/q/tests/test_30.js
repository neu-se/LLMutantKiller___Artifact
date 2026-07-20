let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should coerce thenable objects', function(done) {
        let thenable = {
            then: function(onFulfilled) {
                setTimeout(function() {
                    onFulfilled('thenable result');
                }, 10);
            }
        };
        
        let promise = q(thenable);
        
        promise.then(function(result) {
            assert.strictEqual(result, 'thenable result');
            done();
        }).catch(done);
    });
});