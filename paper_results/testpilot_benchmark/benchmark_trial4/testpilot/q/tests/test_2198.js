let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfapply with error callback', function(done) {
        // Mock Node.js style callback function that fails
        function mockFailingFunction(arg, callback) {
            setTimeout(() => {
                callback(new Error('Test error'));
            }, 10);
        }

        q.nfapply(mockFailingFunction, ['test'])
            .then(function(result) {
                done(new Error('Should have rejected'));
            })
            .catch(function(error) {
                assert.strictEqual(error.message, 'Test error');
                done();
            });
    });
});