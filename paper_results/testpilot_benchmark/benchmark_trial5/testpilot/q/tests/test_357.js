let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.ninvoke - multiple arguments', function(done) {
        const mockObject = {
            multiArgMethod: function(a, b, c, d, callback) {
                setTimeout(() => {
                    callback(null, a * b + c * d);
                }, 10);
            }
        };
        
        q.ninvoke(mockObject, 'multiArgMethod', 2, 3, 4, 5)
            .then(result => {
                assert.strictEqual(result, 26); // 2*3 + 4*5 = 6 + 20 = 26
                done();
            })
            .catch(done);
    });
});