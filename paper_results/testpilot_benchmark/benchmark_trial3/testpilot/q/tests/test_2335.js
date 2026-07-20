let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.ninvoke with no additional arguments', function(done) {
        const mockObject = {
            noArgMethod: function(callback) {
                setTimeout(() => {
                    callback(null, 'success');
                }, 10);
            }
        };

        q.ninvoke(mockObject, 'noArgMethod')
            .then(result => {
                assert.strictEqual(result, 'success');
                done();
            })
            .catch(done);
    });
});