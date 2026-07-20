let assert = require('assert');
let q = require('q');

function spread(value, fulfilled, rejected) {
    return q(value).spread(fulfilled, rejected);
}

describe('test q', function() {
    it('test q.spread with rejected promise', function(done) {
        let rejectedPromise = q.reject(new Error('Test error'));
        
        spread(rejectedPromise, function() {
            done(new Error('Should not call fulfilled handler'));
        }, function(error) {
            assert.equal(error.message, 'Test error');
            done();
        });
    });
});