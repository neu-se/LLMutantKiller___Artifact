let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nodeify with null callback should not throw', function() {
        let promise = q.resolve('test');
        
        // Should not throw an error when nodeback is null/undefined
        assert.doesNotThrow(function() {
            q.nodeify(promise, null);
        });
    });
    
    })