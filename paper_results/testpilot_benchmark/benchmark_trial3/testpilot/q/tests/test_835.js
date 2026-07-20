let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.keys - object with numeric keys', function(done) {
        let obj = { 0: 'zero', 1: 'one', 2: 'two' };
        let promise = q(obj);
        
        promise.keys().then(function(keys) {
            assert.deepEqual(keys.sort(), ['0', '1', '2']);
            done();
        }).catch(done);
    });
});