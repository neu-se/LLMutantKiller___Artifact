let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.tap with callback that throws', function(done) {
        let originalValue = 'test value';
        let callbackError = new Error('callback error');
        
        let promise = q.resolve(originalValue);
        
        q.tap(promise, function(value) {
            throw callbackError;
        }).then(function(result) {
            done(new Error('Promise should have been rejected due to callback error'));
        }).catch(function(err) {
            assert.equal(err, callbackError); // should get callback error
            done();
        });
    });
});