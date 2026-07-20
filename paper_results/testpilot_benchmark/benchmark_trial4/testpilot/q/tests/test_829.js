let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.keys with empty object', function(done) {
        let testObj = {};
        let promise = q(testObj);
        
        promise.keys().then(function(keys) {
            assert.deepEqual(keys, []);
            done();
        }).catch(done);
    });
});