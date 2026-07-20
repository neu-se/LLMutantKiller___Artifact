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
        
        // Test that inspect exists and returns default state
        assert(typeof promise.inspect === 'function');
        const inspectResult = promise.inspect();
        assert.equal(inspectResult.state, 'unknown');
        
        done();
    });

    })