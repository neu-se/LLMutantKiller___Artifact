let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.tap with rejected promise', function(done) {
        let tapped = false;
        let error = new Error('test error');
        
        let promise = q.reject(error);
        
        q.tap(promise, function(value) {
            tapped = true; // this should not be called for rejected promises
        }).then(function(result) {
            done(new Error('Promise should have been rejected'));
        }).catch(function(err) {
            assert.equal(err, error); // should get original error
            assert.equal(tapped, false); // callback should not have been called
            done();
        });
    });
});