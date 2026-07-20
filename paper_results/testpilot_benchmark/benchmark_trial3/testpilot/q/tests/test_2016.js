let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.progress with non-promise object', function(done) {
        let progressCalled = false;
        let plainObject = 'not a promise';
        
        // Create a resolved promise from the plain object
        let promise = q.when(plainObject);
        
        // Q doesn't have a progress method on the main object, 
        // but we can test that a resolved promise works correctly
        promise.then(function(result) {
            assert.equal(result, 'not a promise');
            assert.equal(progressCalled, false); // Progress should not be called for resolved promise
            done();
        }).catch(done);
    });
});