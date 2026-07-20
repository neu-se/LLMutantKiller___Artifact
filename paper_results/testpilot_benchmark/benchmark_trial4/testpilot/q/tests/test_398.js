let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.join - with delayed promises', function(done) {
        let deferred1 = q.defer();
        let deferred2 = q.defer();
        
        q.all([deferred1.promise, deferred2.promise]).then(function(results) {
            assert.strictEqual(results[0], 'delayed1');
            assert.strictEqual(results[1], 'delayed2');
            done();
        }).catch(done);
        
        // Resolve promises after a short delay
        setTimeout(function() {
            deferred1.resolve('delayed1');
        }, 10);
        
        setTimeout(function() {
            deferred2.resolve('delayed2');
        }, 20);
    });
});