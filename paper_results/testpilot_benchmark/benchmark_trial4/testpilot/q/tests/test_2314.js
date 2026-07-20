let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.npost with error callback', function(done) {
        // Create a mock object with a method that calls back with an error
        let mockObject = {
            failingMethod: function(callback) {
                setTimeout(() => {
                    callback(new Error('Something went wrong'));
                }, 10);
            }
        };

        q.npost(mockObject, 'failingMethod', [])
            .then(function(result) {
                done(new Error('Should have rejected'));
            })
            .catch(function(error) {
                assert.strictEqual(error.message, 'Something went wrong');
                done();
            });
    });
});