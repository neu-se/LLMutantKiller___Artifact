let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.post - method that throws error', function(done) {
        let mockObject = {
            throwError: function() {
                throw new Error('Test error');
            }
        };
        
        // Use q.fcall to wrap the synchronous function call in a promise
        q.fcall(function() {
            return mockObject.throwError();
        })
        .then(function() {
            done(new Error('Should have thrown an error'));
        })
        .catch(function(error) {
            assert.equal(error.message, 'Test error');
            done();
        });
    });
});