let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.npost with multiple arguments', function(done) {
        // Create a mock object that takes multiple arguments
        let mockObject = {
            calculate: function(a, b, operation, callback) {
                setTimeout(() => {
                    let result;
                    switch(operation) {
                        case 'add':
                            result = a + b;
                            break;
                        case 'multiply':
                            result = a * b;
                            break;
                        default:
                            return callback(new Error('Unknown operation'));
                    }
                    callback(null, result);
                }, 10);
            }
        };

        q.npost(mockObject, 'calculate', [5, 3, 'multiply'])
            .then(function(result) {
                assert.strictEqual(result, 15);
                done();
            })
            .catch(done);
    });
});