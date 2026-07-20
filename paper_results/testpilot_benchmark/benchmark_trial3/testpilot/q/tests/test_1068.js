let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.timeout', function() {
        
        it('should handle progress notifications', function(done) {
            let deferred = q.defer();
            let progressValues = [];
            let promise = deferred.promise.timeout(100);
            
            promise.then(function(value) {
                assert.equal(value, 'final');
                assert.deepEqual(progressValues, ['progress1', 'progress2']);
                done();
            }, done, function(progress) {
                progressValues.push(progress);
            });
            
            // Send progress notifications
            setTimeout(() => deferred.notify('progress1'), 10);
            setTimeout(() => deferred.notify('progress2'), 20);
            setTimeout(() => deferred.resolve('final'), 30);
        });
    });
});