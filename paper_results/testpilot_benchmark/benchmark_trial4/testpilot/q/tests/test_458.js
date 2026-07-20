let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.then', function() {
        
        it('should chain promises correctly', function(done) {
            let deferred = q.defer();
            let promise = deferred.promise;
            
            promise
                .then(function(value) {
                    return value + ' -> step1';
                })
                .then(function(value) {
                    return value + ' -> step2';
                })
                .then(function(finalValue) {
                    assert.equal(finalValue, 'start -> step1 -> step2');
                    done();
                });
            
            deferred.resolve('start');
        });
    });
});