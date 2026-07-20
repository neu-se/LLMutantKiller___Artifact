let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfapply with no arguments', function(done) {
        // Create a callback that takes no arguments except the callback
        function noArgsCallback(callback) {
            setTimeout(() => {
                callback(null, 'success');
            }, 10);
        }
        
        q.nfapply(noArgsCallback, [])
            .then(result => {
                assert.strictEqual(result, 'success');
                done();
            })
            .catch(done);
    });
});