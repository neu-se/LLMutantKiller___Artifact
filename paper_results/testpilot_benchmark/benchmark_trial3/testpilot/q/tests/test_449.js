let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.then - chaining promises', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        promise.then(function(value) {
            return value + ' modified';
        }).then(function(value) {
            assert.equal(value, 'original modified');
            done();
        });
        
        deferred.resolve('original');
    });

    })