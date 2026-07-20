let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.tap', function() {
        it('should work with non-function callbacks by converting them to functions', function(done) {
            q.resolve('test')
                .tap('not a function')
                .then(function(result) {
                    assert.strictEqual(result, 'test', 'Original value should be preserved');
                    done();
                })
                .catch(done);
        });
    });
});