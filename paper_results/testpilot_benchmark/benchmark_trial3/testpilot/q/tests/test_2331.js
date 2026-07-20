let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.ninvoke with no additional arguments', function(done) {
        // Create a mock object with a method that takes only a callback
        const mockObject = {
            noArgsMethod: function(callback) {
                setTimeout(() => {
                    callback(null, 'success');
                }, 10);
            }
        };

        q.ninvoke(mockObject, 'noArgsMethod')
            .then(result => {
                assert.strictEqual(result, 'success');
                done();
            })
            .catch(done);
    });
});