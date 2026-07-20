let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.done', function() {
        
        it('should handle case with no handlers provided', function(done) {
            let promise = q.resolve('test');
            
            // Should not throw when called with no arguments
            try {
                promise.done();
                done();
            } catch (error) {
                done(error);
            }
        });

    });
});