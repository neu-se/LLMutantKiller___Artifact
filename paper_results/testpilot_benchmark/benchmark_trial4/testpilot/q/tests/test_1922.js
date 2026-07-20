let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.keys with empty object', function(done) {
        let testObj = {};
        
        q.keys(testObj)
            .then(function(keys) {
                assert.deepEqual(keys, []);
                done();
            })
            .catch(done);
    });
});