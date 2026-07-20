let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.div - division by non-zero complex number', function(done) {
        // Test dividing zero by a non-zero complex number
        let a = new complex_js(0, 0); // zero
        let b = new complex_js(3, 4); // 3 + 4i
        
        let result = complex_js.ZERO.div(a, b);
        
        // 0 / (3 + 4i) should equal 0
        assert.strictEqual(result.re, 0);
        assert.strictEqual(result.im, 0);
        done();
    });
    
    })