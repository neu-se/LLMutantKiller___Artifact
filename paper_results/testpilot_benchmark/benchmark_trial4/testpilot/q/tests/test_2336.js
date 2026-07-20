let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.ninvoke with multiple arguments', function(done) {
        // Create a mock object that accepts multiple arguments
        const mockObject = {
            processData: function(arg1, arg2, arg3, callback) {
                setTimeout(() => {
                    callback(null, `processed: ${arg1}, ${arg2}, ${arg3}`);
                }, 10);
            }
        };

        q.ninvoke(mockObject, 'processData', 'first', 'second', 'third')
            .then(result => {
                assert.strictEqual(result, 'processed: first, second, third');
                done();
            })
            .catch(done);
    });

    })