let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.all with resolved promises', function(done) {
        // Create a promise that resolves to an array of promises
        let promise1 = q.resolve(10);
        let promise2 = q.resolve(20);
        let arrayPromise = q.resolve([promise1, promise2]);
        
        arrayPromise.all().then(function(results) {
            assert.deepEqual(results, [10, 20]);
            done();
        }).catch(done);
    });
});