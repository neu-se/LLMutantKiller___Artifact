let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fapply with function returning rejected promise', function(done) {
        function asyncReject() {
            return q.reject(new Error('Async error'));
        }
        
        q.fapply(asyncReject, [])
            .then(function() {
                done(new Error('Should have been rejected'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'Async error');
                done();
            });
    });
    
    })