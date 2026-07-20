let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.ninvoke with multiple arguments', function(done) {
        const mockObject = {
            multiArgMethod: function(a, b, c, d, callback) {
                callback(null, a + b + c + d);
            }
        };

        q.ninvoke(mockObject, 'multiArgMethod', 1, 2, 3, 4)
            .then(result => {
                assert.strictEqual(result, 10);
                done();
            })
            .catch(done);
    });

    })