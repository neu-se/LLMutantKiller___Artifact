let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.join with no callback function', function(done) {
        let promise1 = q.resolve(1);
        let promise2 = q.resolve(2);
        
        q.join(promise1, promise2).then(function(result) {
            assert.deepEqual(result, [1, 2]);
            done();
        }).catch(done);
    });
});