let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.master returns a promise-like object', function(done) {
        let testObject = { value: 42 };
        let master = q.master(testObject);
        
        // Test that master is thenable (has a then method)
        assert(typeof master.then === 'function', 'master should have a then method');
        
        // Test that it has isDef method
        assert(typeof master.isDef === 'function', 'master should have isDef method');
        
        done();
    });

    })