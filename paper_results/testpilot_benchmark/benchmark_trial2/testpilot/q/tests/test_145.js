let mocha = require('mocha');
let assert = require('assert');

describe('test q', function() {
    let obj;
    
    beforeEach(function() {
        // Create a fresh object for each test
        obj = {
            key1: 'value1',
            key2: 'value2',
            key3: 'value3'
        };
    });
    
    it('should handle deletion with undefined key', function(done) {
        // Use delete operator on the object
        let result = delete obj[undefined];
        
        // delete operator returns true even for non-existent properties
        // but deleting with undefined key should return true (as it's a valid operation)
        assert.strictEqual(result, true, 'Delete should return true for undefined key');
        done();
    });
});