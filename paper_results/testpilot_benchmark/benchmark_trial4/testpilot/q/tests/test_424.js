let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test toString on resolved promise', function(done) {
        // Test 2: toString on a resolved promise
        let resolvedPromise = q.resolve('test value');
        
        let toStringResult = resolvedPromise.toString();
        assert(typeof toStringResult === 'string', 'toString should return a string for resolved promise');
        assert(toStringResult.includes('[object') || toStringResult.includes('Promise'), 
               'toString should contain object or Promise identifier');
        
        done();
    });
    
    