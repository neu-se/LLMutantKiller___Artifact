let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.defer.prototype.makeNodeResolver - resolves with single value', function(done) {
        var deferred = q.defer();
        var resolver = deferred.makeNodeResolver();
        
        deferred.promise.then(function(value) {
            assert.strictEqual(value, 'test value');
            done();
        }).catch(done);
        
        // Simulate successful callback with single value
        resolver(null, 'test value');
    });
    
    })