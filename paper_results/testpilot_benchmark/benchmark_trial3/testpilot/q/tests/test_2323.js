let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.ninvoke with method that returns multiple values', function(done) {
        const mockObject = {
            multiValueMethod: function(callback) {
                setTimeout(() => {
                    callback(null, 'first', 'second', 'third');
                }, 10);
            }
        };

        q.ninvoke(mockObject, 'multiValueMethod')
            .then(result => {
                // q.ninvoke should only return the first value after error
                assert.strictEqual(result, 'first');
                done();
            })
            .catch(done);
    });
});