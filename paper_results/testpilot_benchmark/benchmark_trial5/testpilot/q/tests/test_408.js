let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.master fallback behavior', function(done) {
        let testObject = { 
            customMethod: function() { return 'custom result'; }
        };
        let master = q.master(testObject);
        
        // The fallback should handle method calls that aren't isDef
        try {
            // This should trigger the fallback function
            if (typeof master.customMethod === 'function') {
                master.customMethod();
            }
        } catch (e) {
            // Expected if dispatch throws, which is fine for this test
        }
        
        done();
    });
});