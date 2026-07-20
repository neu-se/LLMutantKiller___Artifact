let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.denodeify - success case', function(done) {
        // Mock a Node.js-style function that succeeds
        function mockAsyncFunction(data, callback) {
            setTimeout(() => {
                callback(null, `processed: ${data}`);
            }, 10);
        }

        // Use denodeify directly on the function
        let denodeified = q.denodeify(mockAsyncFunction);
        
        denodeified('test data')
            .then(result => {
                assert.strictEqual(result, 'processed: test data');
                done();
            })
            .catch(done);
    });
});