let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.done', function() {
        
        it('should return undefined', function() {
            let promise = q.resolve('test value');
            let result = promise.done(function() {});
            assert.equal(result, undefined);
        });

            })
})