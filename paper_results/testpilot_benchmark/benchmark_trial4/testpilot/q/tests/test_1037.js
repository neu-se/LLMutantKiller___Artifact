let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.done', function() {
        
        it('should chain handlers correctly', function(done) {
            let promise = q.resolve(5);
            let chainedValue = null;
            
            promise.done(function(value) {
                chainedValue = value * 2;
                assert.equal(chainedValue, 10);
                done();
            });
        });
    });
});