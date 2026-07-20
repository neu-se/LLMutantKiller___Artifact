let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfcall with no additional arguments', function(done) {
        // Mock function that takes only a callback
        function mockNoArgsFunction(callback) {
            setTimeout(() => {
                callback(null, 'success');
            }, 10);
        }
        
        q.nfcall(mockNoArgsFunction)
            .then(result => {
                assert.strictEqual(result, 'success');
                done();
            })
            .catch(done);
    });
});