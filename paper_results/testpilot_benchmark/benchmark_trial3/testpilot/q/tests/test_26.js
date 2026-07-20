let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should handle rejected thenable objects', function(done) {
        let thenable = {
            then: function(onFulfilled, onRejected) {
                setTimeout(function() {
                    onRejected(new Error('thenable error'));
                }, 10);
            }
        };
        
        let promise = q(thenable);
        
        promise.then(function(result) {
            done(new Error('Should not fulfill'));
        }).catch(function(error) {
            assert.strictEqual(error.message, 'thenable error');
            done();
        });
    });
});