let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.spawn with generator that yields rejected promise', function(done) {
        function* rejectedPromiseGenerator() {
            yield q.resolve(1);
            yield q.reject(new Error('Rejected promise'));
            return 'should not reach here';
        }
        
        q.spawn(rejectedPromiseGenerator)
            .then(function() {
                done(new Error('Should have been rejected'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'Rejected promise');
                done();
            });
    });
    
    })