let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.master with simple object', function(done) {
        let testObject = { name: 'test', value: 123 };
        
        // Create a promise from the test object
        let promise = q(testObject);
        
        // Test that we can call inspect on the promise
        let inspection = promise.inspect();
        assert(inspection !== null, 'inspect should return a value');
        assert(inspection.state === 'fulfilled', 'promise should be fulfilled');
        assert.deepEqual(inspection.value, testObject, 'value should match test object');
        
        done();
    });
});