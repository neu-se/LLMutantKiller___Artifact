let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.promised with simple callback', function(done) {
        // Create a simple callback that adds two numbers
        function addNumbers(a, b) {
            return a + b;
        }
        
        // Convert it to a promised function
        const promisedAdd = q.promised(addNumbers);
        
        // Test with resolved promises
        const result = promisedAdd(q.resolve(5), q.resolve(3));
        
        result.then(function(sum) {
            assert.equal(sum, 8);
            done();
        }).catch(done);
    });
    
    })