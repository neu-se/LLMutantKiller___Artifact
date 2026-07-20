let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.done', function() {
        
        it('should call progress handler during promise progress', function(done) {
            let deferred = q.defer();
            let progressCalled = false;
            
            deferred.promise.done(null, null, function(progress) {
                progressCalled = true;
                assert.equal(progress, 'progress update');
                done();
            });
            
            deferred.notify('progress update');
            
            // Give it a tick to execute
            setTimeout(() => {
                if (!progressCalled) {
                    done(new Error('Progress handler was not called'));
                }
            }, 10);
        });

            })
})