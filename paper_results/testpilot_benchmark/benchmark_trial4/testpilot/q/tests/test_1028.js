let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.done with all callbacks', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        let progressValues = [];
        
        promise.done(
            function(value) {
                assert.equal(value, 'completed');
                assert.deepEqual(progressValues, ['step1', 'step2']);
                done();
            },
            function(error) {
                done(error);
            },
            function(progress) {
                progressValues.push(progress);
            }
        );
        
        deferred.notify('step1');
        deferred.notify('step2');
        deferred.resolve('completed');
    });
    
    })