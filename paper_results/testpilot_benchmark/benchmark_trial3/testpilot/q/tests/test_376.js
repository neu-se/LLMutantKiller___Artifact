let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.join - with delayed promises', function(done) {
        let deferred1 = q.defer();
        let deferred2 = q.defer();
        
        // Resolve promises after a delay
        setTimeout(() => deferred1.resolve('delayed1'), 10);
        setTimeout(() => deferred2.resolve('delayed2'), 20);
        
        deferred1.promise.join(deferred2.promise).then(function(results) {
            assert.strictEqual(Array.isArray(results), true);
            assert.strictEqual(results.length, 2);
            assert.strictEqual(results[0], 'delayed1');
            assert.strictEqual(results[1], 'delayed2');
            done();
        }).catch(done);
    });

    })