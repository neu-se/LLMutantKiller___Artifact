let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.join with rejected promise', function(done) {
        let promise1 = q.resolve(10);
        let promise2 = q.reject(new Error('test error'));
        
        q.join(promise1, promise2, function(a, b) {
            return a + b;
        }).then(function(result) {
            done(new Error('Should have been rejected'));
        }).catch(function(error) {
            assert.equal(error.message, 'test error');
            done();
        });
    });
    
    })