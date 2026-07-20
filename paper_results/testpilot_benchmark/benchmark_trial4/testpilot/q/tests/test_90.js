let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.defer - chaining with then', function(done) {
        let deferred = q.defer();
        let initialValue = 10;
        
        deferred.promise
            .then(function(value) {
                return value * 2;
            })
            .then(function(value) {
                assert.equal(value, 20, 'chained promise should transform value correctly');
                done();
            })
            .catch(done);
        
        deferred.resolve(initialValue);
    });
});