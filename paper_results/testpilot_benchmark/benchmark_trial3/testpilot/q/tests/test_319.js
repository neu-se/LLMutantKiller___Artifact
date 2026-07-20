let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.join with no callback function', function(done) {
        let promise1 = q.resolve('test1');
        let promise2 = q.resolve('test2');
        
        q.join(promise1, promise2).then(function(result) {
            assert.deepEqual(result, ['test1', 'test2']);
            done();
        }).catch(done);
    });
});