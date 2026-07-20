let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.progress - progress with promise rejection', function(done) {
        let deferred = q.defer();
        let progressValues = [];
        
        let promise = deferred.promise.progress(function(value) {
            progressValues.push(value);
        });
        
        deferred.notify('step1');
        deferred.notify('step2');
        deferred.reject(new Error('failed'));
        
        promise.then(function() {
            done(new Error('Should not resolve'));
        }).catch(function(error) {
            assert.equal(error.message, 'failed');
            assert.deepEqual(progressValues, ['step1', 'step2']);
            done();
        });
    });
});