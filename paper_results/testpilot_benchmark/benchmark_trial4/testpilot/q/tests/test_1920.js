let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.keys with promise that resolves to object', function(done) {
        let promiseObj = q.resolve({ x: 10, y: 20 });
        
        q.keys(promiseObj)
            .then(function(keys) {
                assert.deepEqual(keys.sort(), ['x', 'y']);
                done();
            })
            .catch(done);
    });
});