let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.spawn with generator that handles rejected promises', function(done) {
        function* errorHandlingGenerator() {
            try {
                yield q.reject(new Error('test error'));
            } catch (error) {
                return 'caught: ' + error.message;
            }
        }
        
        q.spawn(errorHandlingGenerator)
            .then(function(result) {
                assert.equal(result, 'caught: test error');
                done();
            })
            .catch(done);
    });
});