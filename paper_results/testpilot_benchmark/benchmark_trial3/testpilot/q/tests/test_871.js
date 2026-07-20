let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.any - works with single promise', function(done) {
        let deferred = q.defer();
        let promises = [deferred.promise];
        let combinedPromise = q(promises);
        
        combinedPromise.any().then(function(result) {
            assert.strictEqual(result, 'single');
            done();
        }).catch(done);
        
        setTimeout(() => deferred.resolve('single'), 10);
    });
    
    })