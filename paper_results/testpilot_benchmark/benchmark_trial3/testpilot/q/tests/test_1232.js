let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.ninvoke - method with multiple arguments', function(done) {
        // Create a mock object with a method that takes multiple arguments
        const mockObject = {
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

        const promise = q.makePromise(mockObject);
        
        promise.ninvoke('calculate', 5, 3, 'multiply')
            .then(result => {
                assert.strictEqual(result, 15);
                done();
            })
            .catch(done);
    });

    })