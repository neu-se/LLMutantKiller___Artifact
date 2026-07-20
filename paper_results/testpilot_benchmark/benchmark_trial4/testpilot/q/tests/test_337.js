let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise with custom inspect function', function(done) {
        const descriptor = {
            test: function() {
                return 'test result';
            }
        };
        
        const inspect = function() {
            return {state: "fulfilled", value: "inspected value"};
        };
        
        const promise = q.makePromise(descriptor, undefined, inspect);
        
        // Test custom inspect function
        assert.deepEqual(promise.inspect(), {state: "fulfilled", value: "inspected value"});
        
        // Test valueOf returns the inspected value for fulfilled state
        assert.equal(promise.valueOf(), "inspected value");
        
        done();
    });

    })