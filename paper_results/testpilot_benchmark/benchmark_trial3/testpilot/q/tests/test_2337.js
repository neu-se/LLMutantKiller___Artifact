let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.ninvoke with error callback', function(done) {
        const mockObject = {
            errorMethod: function(callback) {
                setTimeout(() => {
                    callback(new Error('Test error'));
                }, 10);
            }
        };

        q.ninvoke(mockObject, 'errorMethod')
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(error => {
                assert.strictEqual(error.message, 'Test error');
                done();
            });
    });
});