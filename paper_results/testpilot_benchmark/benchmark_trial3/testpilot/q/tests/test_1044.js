let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.done', function() {
        
        it('should work with all three handlers', function(done) {
            let deferred = q.defer();
            let progressCalled = false;
            let fulfilledCalled = false;
            
            deferred.promise.done(
                function(value) {
                    fulfilledCalled = true;
                    assert.equal(value, 'final value');
                    assert.equal(progressCalled, true);
                    done();
                },
                function(error) {
                    done(error);
                },
                function(progress) {
                    progressCalled = true;
                    assert.equal(progress, 'progress update');
                }
            );
            
            deferred.notify('progress update');
            deferred.resolve('final value');
        });

    })
})