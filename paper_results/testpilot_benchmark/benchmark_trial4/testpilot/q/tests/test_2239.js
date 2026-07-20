let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfcall with successful callback', function(done) {
        // Mock callback that follows Node.js convention (error, result)
        function mockCallback(arg1, arg2, callback) {
            setTimeout(() => {
                callback(null, arg1 + arg2);
            }, 10);
        }

        q.nfcall(mockCallback, 'hello', 'world')
            .then(result => {
                assert.equal(result, 'helloworld');
                done();
            })
            .catch(done);
    });
});