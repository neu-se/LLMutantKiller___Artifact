let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.any - ignores rejections when one resolves', function(done) {
        let deferred1 = q.defer();
        let deferred2 = q.defer();
        let deferred3 = q.defer();
        
        let promises = [deferred1.promise, deferred2.promise, deferred3.promise];
        let combinedPromise = q(promises);
        
        combinedPromise.any().then(function(result) {
            assert.strictEqual(result, 'success');
            done();
        }).catch(done);
        
        // Mix of rejections and one resolution
        setTimeout(() => deferred1.reject(new Error('fail1')), 10);
        setTimeout(() => deferred2.resolve('success'), 20);
        setTimeout(() => deferred3.reject(new Error('fail2')), 30);
    });
});