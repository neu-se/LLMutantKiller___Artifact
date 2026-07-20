let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.progress - basic progress callback', function(done) {
        let deferred = q.defer();
        let progressValues = [];
        
        deferred.promise.progress(function(value) {
            progressValues.push(value);
        });
        
        // Notify progress multiple times
        deferred.notify('progress1');
        deferred.notify('progress2');
        deferred.notify('progress3');
        
        // Resolve the promise
        deferred.resolve('final result');
        
        // Give time for progress callbacks to execute
        setTimeout(function() {
            assert.deepEqual(progressValues, ['progress1', 'progress2', 'progress3']);
            done();
        }, 10);
    });
    
    })