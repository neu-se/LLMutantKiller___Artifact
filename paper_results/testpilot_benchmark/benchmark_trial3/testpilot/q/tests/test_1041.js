let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.done', function() {
        
        it('should handle chained promises correctly', function(done) {
            let promise = q.resolve(10)
                .then(function(value) {
                    return value * 2;
                })
                .then(function(value) {
                    return value + 5;
                });
            
            promise.done(function(value) {
                assert.equal(value, 25); // (10 * 2) + 5
                done();
            });
        });
    });
});