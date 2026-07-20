let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.any - handles single promise that resolves', function(done) {
        let deferred = q.defer();
        
        // Using Q.race() which resolves with the first resolved promise
        q.race([deferred.promise]).then(function(result) {
            assert.equal(result, 'single');
            done();
        }).catch(done);
        
        setTimeout(() => deferred.resolve('single'), 10);
    });
});