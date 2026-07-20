let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.progress - chaining returns promise', function(done) {
        let deferred = q.defer();
        
        let result = deferred.promise.progress(function(value) {
            // Progress handler
        });
        
        assert(q.isPromise(result), 'progress() should return a promise');
        deferred.resolve('test');
        done();
    });
});