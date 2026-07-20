let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nbind with error callback', function(done) {
        // Mock function that simulates an error
        function mockErrorFunction(callback) {
            setTimeout(() => {
                callback(new Error('Test error'));
            }, 10);
        }
        
        const boundFunction = q.nbind(mockErrorFunction, null);
        
        boundFunction()
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(error => {
                assert.strictEqual(error.message, 'Test error');
                done();
            });
    });
    
    })