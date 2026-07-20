let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.then - progress callback', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        let progressValues = [];
        
        promise.then(function(value) {
            assert.equal(value, 'final value');
            assert.deepEqual(progressValues, ['progress1', 'progress2']);
            done();
        }, null, function(progress) {
            progressValues.push(progress);
            return progress;
        });
        
        deferred.notify('progress1');
        deferred.notify('progress2');
        deferred.resolve('final value');
    });

    })