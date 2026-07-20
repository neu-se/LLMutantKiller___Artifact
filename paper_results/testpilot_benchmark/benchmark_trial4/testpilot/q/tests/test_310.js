let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.join with one promise and one value that match', function(done) {
        let promise1 = q.resolve('test');
        
        q.join(promise1, 'test').then(function(result) {
            assert.strictEqual(result, 'test');
            done();
        }).catch(done);
    });
});