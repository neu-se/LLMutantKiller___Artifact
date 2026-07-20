let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.done with progress callback', function(done) {
        let deferred = q.defer();
        let progressValues = [];
        
        deferred.promise.done(
            function(value) {
                assert.equal(value, 'final result');
                assert.deepEqual(progressValues, [25, 50, 75]);
                done();
            },
            function(error) {
                done(error);
            },
            function(progress) {
                progressValues.push(progress);
            }
        );
        
        // Simulate progress updates
        deferred.notify(25);
        deferred.notify(50);
        deferred.notify(75);
        deferred.resolve('final result');
    });

    })