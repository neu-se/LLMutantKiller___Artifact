let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.progress - should return a new promise', function() {
        let deferred = q.defer();
        let originalPromise = deferred.promise;
        let progressPromise = originalPromise.progress(function() {});
        
        assert.notStrictEqual(originalPromise, progressPromise, 'Should return a new promise instance');
        assert.strictEqual(typeof progressPromise.then, 'function', 'Returned object should be a promise');
    });
});