let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.progress - multiple progress handlers', function(done) {
        let deferred = q.defer();
        let progressValues1 = [];
        let progressValues2 = [];
        
        deferred.promise.progress(function(value) {
            progressValues1.push('handler1:' + value);
        });
        
        deferred.promise.progress(function(value) {
            progressValues2.push('handler2:' + value);
        });
        
        deferred.notify('test');
        deferred.resolve('done');
        
        setTimeout(function() {
            assert.deepEqual(progressValues1, ['handler1:test']);
            assert.deepEqual(progressValues2, ['handler2:test']);
            done();
        }, 10);
    });
});