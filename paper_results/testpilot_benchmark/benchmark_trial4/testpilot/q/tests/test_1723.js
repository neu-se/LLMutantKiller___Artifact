let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.set - should return the modified object', function(done) {
        let obj = {};
        let result = q.set(obj, 'test', 'value');
        assert.strictEqual(result, obj);
        assert.strictEqual(obj.test, 'value');
        done();
    });
});