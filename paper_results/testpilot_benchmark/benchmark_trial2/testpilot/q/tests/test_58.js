let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise with basic descriptor', function(done) {
        let descriptor = {
            when: function() {
                return 'test value';
            },
            get: function(key) {
                return 'property: ' + key;
            }
        };
        
        let promise = q.makePromise(descriptor);
        
        // Test that promiseDispatch works with descriptor methods
        promise.promiseDispatch(function(result) {
            assert.equal(result, 'test value');
        }, 'when', []);
        
        promise.promiseDispatch(function(result) {
            assert.equal(result, 'property: foo');
            done();
        }, 'get', ['foo']);
    });

    })