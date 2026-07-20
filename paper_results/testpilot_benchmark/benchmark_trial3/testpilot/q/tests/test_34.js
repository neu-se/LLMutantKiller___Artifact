let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should return a promise when given an immediate value', function(done) {
        let result = q(42);
        assert(q.isPromise(result), 'q(42) should return a promise');
        result.then(function(value) {
            assert.strictEqual(value, 42, 'Promise should resolve to 42');
            done();
        }).catch(done);
    });
});