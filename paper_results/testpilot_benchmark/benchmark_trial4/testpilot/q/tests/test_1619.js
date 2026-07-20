let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.promised with rejected promise argument', function(done) {
        function simpleCallback(value) {
            return value * 2;
        }
        
        const promisedFunction = q.promised(simpleCallback);
        const rejectedPromise = q.reject(new Error('Test error'));
        
        const result = promisedFunction(rejectedPromise);
        
        result.then(function() {
            done(new Error('Should have rejected'));
        }).catch(function(error) {
            assert.equal(error.message, 'Test error');
            done();
        });
    });
    
    })