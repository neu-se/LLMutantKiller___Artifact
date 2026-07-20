let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.then - progress case', function(done) {
        let deferred = q.defer();
        let progressValues = [];
        
        deferred.promise.then(function(value) {
            assert.equal(value, 'final');
            assert.deepEqual(progressValues, [10, 50, 90]);
            done();
        }, function(error) {
            done(error);
        }, function(progress) {
            progressValues.push(progress);
        });
        
        deferred.notify(10);
        deferred.notify(50);
        deferred.notify(90);
        deferred.resolve('final');
    });
});