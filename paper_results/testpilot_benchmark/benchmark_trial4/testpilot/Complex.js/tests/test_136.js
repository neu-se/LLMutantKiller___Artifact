let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test asin returns Complex object', function(done) {
        let result = complex_js.ZERO.asin();
        
        // Result should be a Complex object
        assert.ok(result instanceof complex_js, 'Result should be a Complex object');
        assert.ok(typeof result.re === 'number', 'Real part should be a number');
        assert.ok(typeof result.im === 'number', 'Imaginary part should be a number');
        
        done();
    });
    
    })