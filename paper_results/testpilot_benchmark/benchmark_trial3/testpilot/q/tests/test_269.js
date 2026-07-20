let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.passByCopy with functions', function(done) {
        let testFunction = function() { return 'test'; };
        let result = q.passByCopy(testFunction);
        
        assert.strictEqual(result, testFunction, 'passByCopy should return the same function reference');
        assert.equal(typeof result, 'function');
        assert.equal(result(), 'test');
        done();
    });
});