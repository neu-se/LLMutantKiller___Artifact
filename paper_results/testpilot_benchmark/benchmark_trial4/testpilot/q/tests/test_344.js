let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise with basic descriptor', function(done) {
        let testValue = 42;
        let descriptor = {
            when: function() {
                return testValue;
            },
            get: function(key) {
                return testValue[key];
            }
        };
        
        let promise = q.makePromise(descriptor);
        
        // Test that promiseDispatch works
        promise.promiseDispatch(function(result) {
            assert.equal(result, testValue);
            done();
        }, 'when', []);
    });
});