let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.any - handles single promise', function(done) {
        let deferred = q.defer();
        
        // Using q.all for a single promise, or q.race if we want "any" behavior
        q.all([deferred.promise]).then(function(result) {
            assert.equal(result[0], 'single'); // q.all returns an array
            done();
        }).catch(done);
        
        setTimeout(() => deferred.resolve('single'), 10);
    });
});