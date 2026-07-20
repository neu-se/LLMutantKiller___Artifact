let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.ninvoke with multiple arguments', function(done) {
        const mockObject = {
            calculate: function(a, b, c, callback) {
                setTimeout(() => {
                    callback(null, a + b + c);
                }, 10);
            }
        };

        q.ninvoke(mockObject, 'calculate', 1, 2, 3)
            .then(result => {
                assert.strictEqual(result, 6);
                done();
            })
            .catch(done);
    });
});