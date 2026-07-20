let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should handle objects without then method as immediate values', function(done) {
        let obj = { foo: 'bar' };
        let result = q(obj);
        
        result.then(function(value) {
            assert.deepStrictEqual(value, obj, 'Should resolve to the original object');
            done();
        }).catch(done);
    });
});