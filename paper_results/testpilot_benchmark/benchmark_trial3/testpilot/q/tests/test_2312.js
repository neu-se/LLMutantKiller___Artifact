let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.npost - method call with error', function(done) {
        let testObj = {
            divide: function(a, b, callback) {
                setTimeout(() => {
                    if (b === 0) {
                        callback(new Error('Division by zero'));
                    } else {
                        callback(null, a / b);
                    }
                }, 10);
            }
        };

        q.npost(testObj, 'divide', [10, 0])
            .then(function(result) {
                done(new Error('Should have thrown an error'));
            })
            .catch(function(error) {
                assert.strictEqual(error.message, 'Division by zero');
                done();
            });
    });
});