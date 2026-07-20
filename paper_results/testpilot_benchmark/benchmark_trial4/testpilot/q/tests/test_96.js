let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.defer - multiple resolve calls ignored', function(done) {
        const deferred = q.defer();
        const firstValue = 'first';
        const secondValue = 'second';
        
        deferred.promise.then(function(value) {
            assert.equal(value, firstValue, 'should only resolve with first value');
            done();
        }).catch(done);
        
        deferred.resolve(firstValue);
        deferred.resolve(secondValue); // This should be ignored
    });

    })