let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fbind with function that throws error', function(done) {
        function throwError(message) {
            throw new Error(message);
        }
        
        let boundThrow = q.fbind(throwError, 'test error');
        let result = boundThrow();
        
        result.then(function() {
            done(new Error('Should have rejected'));
        }).catch(function(error) {
            assert.equal(error.message, 'test error');
            done();
        });
    });
    
    })