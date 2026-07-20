let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.keys with immediate object', function(done) {
        let obj = { a: 1, b: 2, c: 3 };
        
        q.keys(obj).then(function(keys) {
            assert.deepEqual(keys.sort(), ['a', 'b', 'c']);
            done();
        }).catch(done);
    });
});