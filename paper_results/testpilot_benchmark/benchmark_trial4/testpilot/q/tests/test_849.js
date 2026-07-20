let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.all with resolved promises', function(done) {
        // Create promises
        let promise1 = q.resolve(10);
        let promise2 = q.resolve(20);
        
        // Use q.all with an array of promises
        q.all([promise1, promise2]).then(function(results) {
            assert.deepEqual(results, [10, 20]);
            done();
        }).catch(done);
    });
});