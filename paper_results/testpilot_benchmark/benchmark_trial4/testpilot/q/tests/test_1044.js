let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.done', function() {
        
        it('should call rejected handler when promise rejects', function(done) {
            let promise = q.reject(new Error('test error'));
            
            promise.done(null, function(error) {
                assert.equal(error.message, 'test error');
                done();
            });
        });

    })
})