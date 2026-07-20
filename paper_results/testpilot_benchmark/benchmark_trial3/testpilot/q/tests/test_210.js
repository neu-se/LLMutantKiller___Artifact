let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.Promise.all with delayed promises', function(done) {
        let promise1 = q.delay(10).then(() => 'first');
        let promise2 = q.delay(5).then(() => 'second');
        let promise3 = q.resolve('third');
        
        q.Promise.all([promise1, promise2, promise3])
            .then(function(results) {
                assert.deepEqual(results, ['first', 'second', 'third']);
                done();
            })
            .catch(done);
    });
});