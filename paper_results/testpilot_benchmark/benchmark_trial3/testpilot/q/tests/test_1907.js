let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.keys with object containing non-enumerable properties', function(done) {
        let obj = { visible: 1 };
        Object.defineProperty(obj, 'hidden', {
            value: 2,
            enumerable: false
        });
        q.keys(obj).then(function(keys) {
            assert.deepEqual(keys, ['visible']);
            done();
        }).catch(done);
    });
});