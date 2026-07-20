let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.defer - multiple resolves only use first', function(done) {
        let deferred = q.defer();
        let firstValue = 'first';
        let secondValue = 'second';
        
        deferred.promise.then(function(result) {
            assert.equal(result, firstValue, 'promise should resolve with first value only');
            done();
        }).catch(done);
        
        deferred.resolve(firstValue);
        deferred.resolve(secondValue); // This should be ignored
    });
});