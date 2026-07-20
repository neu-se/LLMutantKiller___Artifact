let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.toString', function(done) {
        // Test that ZERO constant exists
        assert(complex_js.ZERO !== undefined, 'ZERO constant should be defined');
        
        // Test that toString method exists and is callable
        assert(typeof complex_js.ZERO.toString === 'function', 'toString should be a function');
        
        // Test the actual string representation of ZERO
        let result = complex_js.ZERO.toString();
        assert(typeof result === 'string', 'toString should return a string');
        
        // ZERO should represent 0 + 0i, common representations could be "0", "0+0i", etc.
        // We'll check for the most common representation
        assert(result === '0' || result === '0+0i' || result === '0 + 0i' || result.includes('0'), 
               'ZERO toString should contain zero representation');
        
        done();
    });
    
    })