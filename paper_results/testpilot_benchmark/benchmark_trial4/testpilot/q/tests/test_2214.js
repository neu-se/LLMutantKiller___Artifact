let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfapply with no arguments', function(done) {
        // Mock function with no arguments except callback
        function mockNoArgsFunction(callback) {
            setTimeout(() => {
                callback(null, 'success');
            }, 10);
        }
        
        q.nfapply(mockNoArgsFunction, [])
            .then(result => {
                assert.strictEqual(result, 'success');
                done();
            })
            .catch(done);
    });
});