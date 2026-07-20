let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.all - preserves order of results', function(done) {
        let deferred1 = q.defer();
        let deferred2 = q.defer();
        let deferred3 = q.defer();
        
        // Resolve in reverse order to test that results maintain original order
        setTimeout(() => deferred3.resolve('third'), 10);
        setTimeout(() => deferred2.resolve('second'), 20);
        setTimeout(() => deferred1.resolve('first'), 30);
        
        let mainPromise = q.resolve();
        mainPromise.all([deferred1.promise, deferred2.promise, deferred3.promise])
            .then(function(results) {
                assert.deepEqual(results, ['first', 'second', 'third']);
                done();
            })
            .catch(done);
    });
});