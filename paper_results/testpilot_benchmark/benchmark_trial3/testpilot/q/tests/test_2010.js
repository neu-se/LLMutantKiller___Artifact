let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.progress with deferred promise and progress notifications', function(done) {
        let progressValues = [];
        let deferred = q.defer();
        
        q.progress(deferred.promise, function(progress) {
            progressValues.push(progress);
        }).then(function(result) {
            assert.equal(result, 'final result');
            assert.deepEqual(progressValues, [25, 50, 75, 100]);
            done();
        }).catch(done);
        
        // Simulate progress notifications
        setTimeout(() => deferred.notify(25), 10);
        setTimeout(() => deferred.notify(50), 20);
        setTimeout(() => deferred.notify(75), 30);
        setTimeout(() => deferred.notify(100), 40);
        setTimeout(() => deferred.resolve('final result'), 50);
    });

    })