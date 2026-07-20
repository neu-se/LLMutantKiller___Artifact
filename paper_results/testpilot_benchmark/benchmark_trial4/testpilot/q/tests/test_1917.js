let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.keys with promised object', function(done) {
        let obj = { x: 10, y: 20, z: 30 };
        let promise = q.resolve(obj);
        q.keys(promise).then(function(keys) {
            assert.deepEqual(keys.sort(), ['x', 'y', 'z']);
            done();
        }).catch(done);
    });
});