let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.catch - can chain after catch', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        promise.catch(function(error) {
            return 'recovered';
        }).then(function(value) {
            assert.equal(value, 'recovered');
            done();
        });
        
        deferred.reject(new Error('Initial error'));
    });
    
    })