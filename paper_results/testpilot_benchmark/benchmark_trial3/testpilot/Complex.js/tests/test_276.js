let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.valueOf returns correct object structure', function(done) {
        let result = complex_js.ZERO.valueOf();
        
        // Test that valueOf returns an object with re and im properties
        assert(typeof result === 'object', 'valueOf should return an object');
        assert(result.hasOwnProperty('re'), 'result should have re property');
        assert(result.hasOwnProperty('im'), 'result should have im property');
        
        done();
    });

    })