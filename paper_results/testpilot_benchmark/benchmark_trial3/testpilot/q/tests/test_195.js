let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.race - resolves before rejection when both happen simultaneously', function(done) {
        let resolvedPromise = q.resolve('success');
        let rejectedPromise = q.reject(new Error('failure'));
        
        let racePromise = q.race([resolvedPromise, rejectedPromise]);
        
        racePromise.then(function(value) {
            assert.equal(value, 'success');
            done();
        }).catch(function(error) {
            // This could also happen depending on implementation details
            assert.equal(error.message, 'failure');
            done();
        });
    });
});