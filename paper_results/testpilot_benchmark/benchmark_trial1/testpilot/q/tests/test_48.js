let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise with basic descriptor', function(done) {
        const descriptor = {
            get: function() {
                return 'test value';
            },
            set: function(value) {
                this._value = value;
                return 'set complete';
            }
        };
        
        const promise = q.makePromise(descriptor);
        
        // Test that promiseDispatch exists
        assert(typeof promise.promiseDispatch === 'function');
        
        // Test get operation
        promise.promiseDispatch(function(result) {
            assert.equal(result, 'test value');
        }, 'get', []);
        
        // Test set operation
        promise.promiseDispatch(function(result) {
            assert.equal(result, 'set complete');
            done();
        }, 'set', ['new value']);
    });

    })