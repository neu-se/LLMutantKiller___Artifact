let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.progress with resolved promise', function(done) {
        let progressCalled = false;
        let progressValue = null;
        
        let deferred = q.defer();
        
        q.progress(deferred.promise, function(progress) {
            progressCalled = true;
            progressValue = progress;
        }).then(function(result) {
            assert.equal(result, 'success');
            assert.equal(progressCalled, true);
            assert.equal(progressValue, 'halfway');
            done();
        }).catch(done);
        
        deferred.notify('halfway');
        deferred.resolve('success');
    });
    
    })