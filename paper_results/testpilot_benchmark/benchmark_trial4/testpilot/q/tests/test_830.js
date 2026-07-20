let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.keys with object', function(done) {
        let testObj = { a: 1, b: 2, c: 3 };
        let promise = q(testObj);
        
        promise.keys().then(function(keys) {
            assert.deepEqual(keys.sort(), ['a', 'b', 'c']);
            done();
        }).catch(done);
    });
});