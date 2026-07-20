let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.done', function() {
        
        it('should call progress handler during promise progress', function(done) {
            let deferred = q.defer();
            let progressValues = [];
            
            deferred.promise.done(null, null, function(progress) {
                progressValues.push(progress);
                if (progressValues.length === 2) {
                    assert.deepEqual(progressValues, ['progress1', 'progress2']);
                    done();
                }
            });
            
            deferred.notify('progress1');
            deferred.notify('progress2');
            deferred.resolve('final value');
        });

            })
})