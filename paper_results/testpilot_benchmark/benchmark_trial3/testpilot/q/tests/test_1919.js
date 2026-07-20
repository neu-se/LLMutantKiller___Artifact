let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.keys with object containing non-enumerable properties', function(done) {
        let obj = { a: 1, b: 2 };
        Object.defineProperty(obj, 'c', {
            value: 3,
            enumerable: false
        });
        q.keys(obj)
            .then(function(keys) {
                assert.deepEqual(keys.sort(), ['a', 'b']);
                done();
            })
            .catch(done);
    });
});