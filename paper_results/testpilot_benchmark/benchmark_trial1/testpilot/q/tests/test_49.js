let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise with basic descriptor', function(done) {
        const descriptor = {
            when: function() {
                return 'test value';
            },
            get: function(key) {
                return key === 'prop' ? 'property value' : undefined;
            }
        };
        
        const promise = q.makePromise(descriptor);
        
        // Test that promiseDispatch works with descriptor methods
        promise.promiseDispatch(function(result) {
            assert.equal(result, 'test value');
        }, 'when', []);
        
        promise.promiseDispatch(function(result) {
            assert.equal(result, 'property value');
            done();
        }, 'get', ['prop']);
    });

    })