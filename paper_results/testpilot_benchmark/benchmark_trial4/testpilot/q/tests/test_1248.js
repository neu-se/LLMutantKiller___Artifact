let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.ninvoke - method not found', function(done) {
        const mockObject = {
            nonExistentMethod: function(callback) {
                callback(new Error('Method not found'));
            }
        };

        // Use q.ninvoke directly on the mock object
        q.ninvoke(mockObject, 'nonExistentMethod')
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(error => {
                assert.strictEqual(error.message, 'Method not found');
                done();
            });
    });
});