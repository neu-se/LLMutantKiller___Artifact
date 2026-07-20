let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.ninvoke with method that returns multiple values', function(done) {
        const mockObject = {
            multiValueMethod: function(callback) {
                callback(null, 'first', 'second', 'third');
            }
        };

        q.ninvoke(mockObject, 'multiValueMethod')
            .then(result => {
                // q.ninvoke only returns the first non-error argument
                assert.strictEqual(result, 'first');
                done();
            })
            .catch(done);
    });
});