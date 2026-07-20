let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.toString', function(done) {
        // Test that ZERO constant exists
        assert(complex_js.ZERO !== undefined, 'ZERO constant should be defined');
        
        // Test that toString method exists and is callable
        assert(typeof complex_js.ZERO.toString === 'function', 'toString should be a function');
        
        // Test the string representation of ZERO
        let result = complex_js.ZERO.toString();
        assert(typeof result === 'string', 'toString should return a string');
        
        // ZERO should represent 0 + 0i, common representations could be "0", "0+0i", etc.
        // We'll check that it contains "0" and doesn't contain non-zero numbers
        assert(result.includes('0'), 'ZERO toString should contain "0"');
        assert(!result.includes('1'), 'ZERO toString should not contain "1"');
        assert(!result.includes('2'), 'ZERO toString should not contain "2"');
        
        done();
    });
    
    })