let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test denodeify with multiple arguments', function(done) {
        // Mock function that takes multiple arguments plus callback
        function mockMultiArgFunction(arg1, arg2, arg3, callback) {
            setTimeout(() => {
                callback(null, arg1 + arg2 + arg3);
            }, 10);
        }

        // Use q.denodeify directly on the function
        let denodeified = q.denodeify(mockMultiArgFunction);
        
        denodeified('a', 'b', 'c')
            .then(result => {
                assert.strictEqual(result, 'abc');
                done();
            })
            .catch(done);
    });
});