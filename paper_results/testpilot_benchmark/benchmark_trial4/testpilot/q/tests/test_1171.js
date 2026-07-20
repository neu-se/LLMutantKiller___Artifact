let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test denodeify with no additional arguments', function(done) {
        // Mock function that only takes a callback
        function mockNoArgFunction(callback) {
            setTimeout(() => {
                callback(null, 'no args result');
            }, 10);
        }

        let denodeified = q.denodeify(mockNoArgFunction);
        
        denodeified()
            .then(result => {
                assert.strictEqual(result, 'no args result');
                done();
            })
            .catch(done);
    });
});