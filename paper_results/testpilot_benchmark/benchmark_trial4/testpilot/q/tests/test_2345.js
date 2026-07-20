let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.ninvoke with multiple arguments', function(done) {
        const mockObject = {
            multiArgMethod: function(a, b, c, callback) {
                setTimeout(() => {
                    callback(null, a * b * c);
                }, 10);
            }
        };

        q.ninvoke(mockObject, 'multiArgMethod', 2, 3, 4)
            .then(result => {
                assert.strictEqual(result, 24);
                done();
            })
            .catch(done);
    });
});