let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.master with basic object', function(done) {
        // Create a simple object to pass to q.master
        let testObject = {
            add: function(a, b) {
                return a + b;
            },
            multiply: function(a, b) {
                return a * b;
            }
        };
        
        try {
            let master = q.master(testObject);
            
            // Verify that master is created and is an object
            assert(master !== null, 'Master should not be null');
            assert(typeof master === 'object', 'Master should be an object');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});