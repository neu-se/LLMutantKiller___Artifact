let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.passByCopy with functions', function(done) {
        let testFunction = function() { return 'test'; };
        let result = q.passByCopy(testFunction);
        
        assert.strictEqual(result, testFunction, 'should return the same function reference');
        assert.strictEqual(result(), 'test', 'function should still be callable');
        done();
    });
});