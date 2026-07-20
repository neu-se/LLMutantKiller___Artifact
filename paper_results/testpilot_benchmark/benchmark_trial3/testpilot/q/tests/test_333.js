let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise with pending state inspect', function(done) {
        const descriptor = {};
        const inspect = function() {
            return {state: 'pending'};
        };
        
        const promise = q.makePromise(descriptor, undefined, inspect);
        
        // Test valueOf returns promise itself for pending state
        assert.equal(promise.valueOf(), promise);
        done();
    });

    })