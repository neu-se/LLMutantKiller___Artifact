let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.isPending - should return false for immediately resolved promise', function() {
        let promise = q.resolve('immediate value');
        
        assert.strictEqual(promise.isPending(), false);
    });
    
    })