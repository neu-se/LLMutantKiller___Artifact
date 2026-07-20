let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.master returns a promise-like object', function(done) {
        let testObject = { value: 42 };
        let master = q.master(testObject);
        
        // Test that master returns an object with expected properties
        assert(typeof master === 'object', 'master should return an object');
        assert(typeof master.isDef === 'function', 'master should have isDef method');
        assert(typeof master.then === 'function', 'master should have then method (promise-like)');
        
        done();
    });

    })