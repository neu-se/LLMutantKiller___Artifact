let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.defer - notify after resolve ignored', function(done) {
        const deferred = q.defer();
        let notificationCount = 0;
        
        deferred.promise.then(function(value) {
            // Give some time for any erroneous notifications
            setTimeout(function() {
                assert.equal(notificationCount, 1, 'should only receive notification before resolve');
                done();
            }, 10);
        }, null, function(progress) {
            notificationCount++;
        }).catch(done);
        
        deferred.notify('before resolve');
        deferred.resolve('resolved');
        deferred.notify('after resolve'); // This should be ignored
    });

    })