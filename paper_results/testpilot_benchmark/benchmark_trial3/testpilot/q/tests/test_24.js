let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should wrap immediate values in a promise', function(done) {
        let value = 42;
        let result = q(value);
        
        assert(q.isPromise(result), 'Result should be a promise');
        result.then(function(resolvedValue) {
            assert.strictEqual(resolvedValue, 42, 'Promise should resolve to the original value');
            done();
        }).catch(done);
    });
});