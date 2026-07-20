let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.master with array object', function(done) {
        let testArray = [1, 2, 3, 'test'];
        let master = q(testArray); // Use q() to create a promise from the array
        
        assert(typeof master.isDef !== 'function', 'master should work with arrays');
        
        // Test that we can inspect promises
        let inspection = master.inspect();
        assert(inspection !== null, 'inspect should work with arrays');
        assert(inspection.state === 'fulfilled', 'promise should be fulfilled');
        assert.deepEqual(inspection.value, testArray, 'value should match original array');
        
        done();
    });
});