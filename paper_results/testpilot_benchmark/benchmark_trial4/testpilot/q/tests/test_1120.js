let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfapply - empty arguments', function(done) {
        // Create a mock function with no arguments except callback
        function mockNoArgsFunction(callback) {
            setTimeout(() => {
                callback(null, 'success');
            }, 10);
        }
        
        // Use q.nfapply directly with the function and empty arguments array
        q.nfapply(mockNoArgsFunction, [])
            .then(result => {
                assert.strictEqual(result, 'success');
                done();
            })
            .catch(done);
    });
});