let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.spread with rejected promise', function(done) {
        let promise = q.reject(new Error('test error'));
        
        promise.spread(function() {
            done(new Error('Should not reach fulfilled handler'));
        }, function(error) {
            assert.equal(error.message, 'test error');
            done();
        });
    });
});