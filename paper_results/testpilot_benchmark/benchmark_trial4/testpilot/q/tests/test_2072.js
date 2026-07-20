let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.done returns nothing', function() {
        let promise = q.resolve('test');
        let result = q.done(promise, function() {});
        
        assert.equal(result, undefined);
    });
});