let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.defer - basic resolve', function(done) {
        var deferred = q.defer();
        
        deferred.promise.then(function(value) {
            assert.equal(value, 'test value');
            done();
        }).catch(done);
        
        deferred.resolve('test value');
    });
    
    })