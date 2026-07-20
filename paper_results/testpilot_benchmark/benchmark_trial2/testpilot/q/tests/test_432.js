let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.spawn with generator that handles errors', function(done) {
        function* errorHandlingGenerator() {
            try {
                yield q.reject(new Error('test error'));
            } catch (e) {
                return 'caught: ' + e.message;
            }
        }
        
        // Use q.async instead of q.spawn
        let asyncFn = q.async(errorHandlingGenerator);
        
        asyncFn()
            .then(function(result) {
                assert.equal(result, 'caught: test error');
                done();
            })
            .catch(done);
    });
});