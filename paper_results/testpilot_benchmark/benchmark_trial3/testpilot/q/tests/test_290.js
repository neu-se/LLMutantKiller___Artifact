let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.join with delayed promises', function(done) {
        let promise1 = q.delay(10).then(() => 'hello');
        let promise2 = q.delay(20).then(() => 'world');
        
        q.join(promise1, promise2, function(a, b) {
            return a + ' ' + b;
        }).then(function(result) {
            assert.equal(result, 'hello world');
            done();
        }).catch(done);
    });
});