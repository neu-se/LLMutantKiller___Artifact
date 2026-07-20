let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.post with method that throws error', function(done) {
        let testObject = {
            throwError: function() {
                throw new Error('Test error');
            }
        };
        
        q.post(testObject, 'throwError', [])
            .then(function(result) {
                done(new Error('Should have thrown an error'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'Test error');
                done();
            });
    });
    
    })