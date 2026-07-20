let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.defer.prototype.makeNodeResolver - success case', function(done) {
        let deferred = q.defer();
        let resolver = deferred.makeNodeResolver();
        
        // Simulate successful callback
        resolver(null, 'success result');
        
        deferred.promise.then(function(result) {
            assert.equal(result, 'success result');
            done();
        }).catch(done);
    });
    
    })