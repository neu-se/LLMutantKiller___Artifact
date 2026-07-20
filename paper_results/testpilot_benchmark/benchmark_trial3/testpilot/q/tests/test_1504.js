let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q with property access', function(done) {
        let testObject = {
            name: 'test',
            nested: { value: 123 }
        };
        
        // Create a promise that resolves to the test object
        let promise = q(testObject);
        
        // Test property access using promise chaining
        promise.then(function(obj) {
            assert.strictEqual(obj.name, 'test');
            return obj.nested;
        }).then(function(result) {
            assert.deepStrictEqual(result, { value: 123 });
            done();
        }).catch(done);
    });
});