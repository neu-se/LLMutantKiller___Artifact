let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nodeify with delayed promise', function(done) {
        let deferred = q.defer();
        q.nodeify(deferred.promise, function(err, result) {
            assert.strictEqual(err, null);
            assert.strictEqual(result, 'delayed result');
            done();
        });
        
        setTimeout(function() {
            deferred.resolve('delayed result');
        }, 10);
    });
});