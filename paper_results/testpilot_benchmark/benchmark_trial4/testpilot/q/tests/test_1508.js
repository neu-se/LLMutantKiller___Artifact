let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q with nested object operations', function(done) {
        let testObject = {
            nested: {
                deep: {
                    value: 'deeply nested'
                }
            }
        };
        
        // Create a promise that resolves with the test object
        let promise = q.resolve(testObject);
        
        // Test nested property access using promise chaining
        promise
            .then(function(obj) {
                return obj.nested;
            })
            .then(function(nested) {
                return nested.deep;
            })
            .then(function(deep) {
                return deep.value;
            })
            .then(function(result) {
                assert.strictEqual(result, 'deeply nested', 'should handle nested operations');
                done();
            })
            .catch(done);
    });
});