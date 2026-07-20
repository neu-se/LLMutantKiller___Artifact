let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.passByCopy with nested objects', function(done) {
        let nestedObject = {
            outer: {
                inner: {
                    value: 'nested'
                }
            },
            array: [1, 2, { nested: true }]
        };
        
        let result = q.passByCopy(nestedObject);
        
        assert.strictEqual(result, nestedObject, 'passByCopy should return the same nested object reference');
        assert.equal(result.outer.inner.value, 'nested');
        assert.equal(result.array[2].nested, true);
        done();
    });
});