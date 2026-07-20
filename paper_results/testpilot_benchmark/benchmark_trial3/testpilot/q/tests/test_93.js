let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.defer - notify progress', function(done) {
        const deferred = q.defer();
        const progressValues = [];
        
        deferred.promise.then(function(value) {
            assert.deepEqual(progressValues, [1, 2, 3], 'should receive all progress notifications');
            assert.equal(value, 'final', 'should resolve with final value');
            done();
        }, null, function(progress) {
            progressValues.push(progress);
        }).catch(done);
        
        deferred.notify(1);
        deferred.notify(2);
        deferred.notify(3);
        deferred.resolve('final');
    });

    })