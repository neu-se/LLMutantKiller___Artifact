let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.ninvoke - nonexistent method', function(done) {
        const mockObject = {
            existingMethod: function(callback) {
                callback(null, 'success');
            }
        };

        q.ninvoke(mockObject, 'nonExistentMethod')
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(error => {
                assert(error instanceof TypeError);
                done();
            });
    });
});