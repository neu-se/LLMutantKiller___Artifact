let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.ninvoke with multiple arguments', function(done) {
        // Create a mock object that accepts multiple arguments
        const mockObject = {
            multiArgMethod: function(arg1, arg2, arg3, callback) {
                setTimeout(() => {
                    callback(null, `${arg1}-${arg2}-${arg3}`);
                }, 10);
            }
        };

        q.ninvoke(mockObject, 'multiArgMethod', 'a', 'b', 'c')
            .then(result => {
                assert.strictEqual(result, 'a-b-c');
                done();
            })
            .catch(done);
    });
});