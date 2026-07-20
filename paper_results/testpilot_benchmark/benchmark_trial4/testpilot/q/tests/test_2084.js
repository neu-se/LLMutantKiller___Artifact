let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.done with progress callback', function(done) {
        let deferred = q.defer();
        let progressValues = [];
        
        deferred.promise.done(function(value) {
            assert.strictEqual(value, 'final');
            assert.deepEqual(progressValues, ['progress1', 'progress2']);
            done();
        }, function(error) {
            done(error);
        });
        
        deferred.promise.progress(function(progress) {
            progressValues.push(progress);
        });
        
        deferred.notify('progress1');
        deferred.notify('progress2');
        deferred.resolve('final');
    });
});