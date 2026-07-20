let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.progress - should not interfere with promise resolution', function(done) {
        let deferred = q.defer();
        
        deferred.promise.progress(function(value) {
            // Progress handler that doesn't affect resolution
        }).then(function(result) {
            assert.strictEqual(result, 'success', 'Promise should resolve normally');
            done();
        }).catch(done);
        
        deferred.notify('progress update');
        deferred.resolve('success');
    });
    
    })