let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.any - handles single promise', function(done) {
        let deferred = q.defer();
        
        q.any([deferred.promise]).then(function(result) {
            assert.equal(result, 'single');
            done();
        }).catch(done);
        
        setTimeout(() => deferred.resolve('single'), 10);
    });
});