let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nbind with simple callback', function(done) {
        // Create a simple node-style callback function
        function nodeStyleFunction(value, callback) {
            setTimeout(() => {
                if (value > 0) {
                    callback(null, value * 2);
                } else {
                    callback(new Error('Value must be positive'));
                }
            }, 10);
        }
        
        // Bind the function using q.nbind
        const promisifiedFunction = q.nbind(nodeStyleFunction);
        
        // Test successful case
        promisifiedFunction(5)
            .then(result => {
                assert.equal(result, 10);
                done();
            })
            .catch(done);
    });
    
    })