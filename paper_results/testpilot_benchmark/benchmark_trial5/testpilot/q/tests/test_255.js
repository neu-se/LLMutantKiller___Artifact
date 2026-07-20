let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.timeout - promise resolves before timeout', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise.timeout(100, new Error("Custom timeout error"));
        
        // Resolve the promise quickly (before timeout)
        setTimeout(() => {
            deferred.resolve("success");
        }, 50);
        
        promise.then(function(result) {
            assert.equal(result, "success");
            done();
        }).catch(done);
    });
    
    })