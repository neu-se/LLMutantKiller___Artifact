let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.keys with object containing numeric keys', function(done) {
        let testObj = { 0: 'zero', 1: 'one', 2: 'two' };
        
        q.keys(testObj)
            .then(function(keys) {
                assert.deepEqual(keys.sort(), ['0', '1', '2']);
                done();
            })
            .catch(done);
    });
});