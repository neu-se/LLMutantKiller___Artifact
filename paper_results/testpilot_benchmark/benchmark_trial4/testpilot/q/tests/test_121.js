let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.defer.prototype.makeNodeResolver - integration with async function', function(done) {
        let deferred = q.defer();
        let resolver = deferred.makeNodeResolver();
        
        // Simulate an async operation
        function asyncOperation(callback) {
            setTimeout(function() {
                callback(null, 'async result');
            }, 10);
        }
        
        asyncOperation(resolver);
        
        deferred.promise.then(function(result) {
            assert.equal(result, 'async result');
            done();
        }).catch(done);
    });
});