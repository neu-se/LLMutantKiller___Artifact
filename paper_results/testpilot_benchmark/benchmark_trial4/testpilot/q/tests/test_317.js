let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.join with function that throws error', function(done) {
        let promise = q.resolve(1);
        let joinFunction = function(value) {
            throw new Error('join function error');
        };
        
        q.join(promise, joinFunction)
            .then(function() {
                done(new Error('Should have rejected'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'join function error');
                done();
            });
    });
});