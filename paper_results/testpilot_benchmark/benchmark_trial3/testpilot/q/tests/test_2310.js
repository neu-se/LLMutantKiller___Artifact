let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.npost - method that returns multiple values', function(done) {
        let testObj = {
            getStats: function(numbers, callback) {
                setTimeout(() => {
                    let sum = numbers.reduce((a, b) => a + b, 0);
                    let avg = sum / numbers.length;
                    callback(null, sum, avg);
                }, 10);
            }
        };

        q.npost(testObj, 'getStats', [[1, 2, 3, 4, 5]])
            .then(function(result) {
                // q.npost returns only the first result value
                assert.strictEqual(result, 15);
                done();
            })
            .catch(done);
    });
});