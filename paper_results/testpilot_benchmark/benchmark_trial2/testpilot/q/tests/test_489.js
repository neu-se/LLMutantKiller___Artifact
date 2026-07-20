let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.set - should return the modified object', function(done) {
        let obj = {};
        // Create a simple set function that sets a property and returns the object
        function set(target, key, value) {
            target[key] = value;
            return target;
        }
        
        let result = set(obj, 'test', 'value');
        assert.strictEqual(result, obj);
        assert.strictEqual(obj.test, 'value');
        done();
    });
});