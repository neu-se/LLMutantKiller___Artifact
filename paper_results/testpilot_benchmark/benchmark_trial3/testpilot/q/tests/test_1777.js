let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.invoke with method that throws an error', function(done) {
        let testObject = {
            throwError: function() {
                throw new Error('Test error');
            }
        };
        
        q.invoke(testObject, 'throwError')
            .then(function() {
                done(new Error('Should have thrown an error'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'Test error');
                done();
            });
    });
    
    })