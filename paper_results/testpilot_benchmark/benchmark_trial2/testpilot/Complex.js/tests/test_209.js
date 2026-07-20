let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.acsch', function(done) {
        
        // Test 1: acsch(0) should return Infinity
        let result1 = complex_js.ZERO.acsch();
        assert.strictEqual(result1.re, Infinity);
        assert.strictEqual(result1.im, 0);
        
        // Test 2: acsch(1) - real positive number
        let one = new complex_js(1, 0);
        let result2 = one.acsch();
        let expected2 = Math.log(1 + Math.sqrt(2)); // log(1 + sqrt(1 + 1))
        assert(Math.abs(result2.re - expected2) < 1e-10);
        assert(Math.abs(result2.im) < 1e-10);
        
        // Test 3: acsch(-1) - real negative number
        let negOne = new complex_js(-1, 0);
        let result3 = negOne.acsch();
        let expected3 = Math.log(-1 + Math.sqrt(2)); // log(-1 + sqrt(1 + 1))
        assert(Math.abs(result3.re - expected3) < 1e-10);
        assert(Math.abs(result3.im) < 1e-10);
        
        // Test 4: acsch(2) - another real number
        let two = new complex_js(2, 0);
        let result4 = two.acsch();
        let expected4 = Math.log(2 + Math.sqrt(5)); // log(2 + sqrt(4 + 1))
        assert(Math.abs(result4.re - expected4) < 1e-10);
        assert(Math.abs(result4.im) < 1e-10);
        
        // Test 5: acsch(i) - pure imaginary number
        let i = new complex_js(0, 1);
        let result5 = i.acsch();
        // For pure imaginary bi, acsch(bi) = (1/bi).asinh() = (-i/b).asinh()
        let expected5 = new complex_js(0, -1).asinh();
        assert(Math.abs(result5.re - expected5.re) < 1e-10);
        assert(Math.abs(result5.im - expected5.im) < 1e-10);
        
        // Test 6: acsch(1+i) - general complex number
        let oneI = new complex_js(1, 1);
        let result6 = oneI.acsch();
        // For general complex number, acsch(a+bi) = (a-bi)/(a²+b²).asinh()
        // For 1+i: d = 1+1 = 2, so (1-i)/2 = 0.5-0.5i
        let expected6 = new complex_js(0.5, -0.5).asinh();
        assert(Math.abs(result6.re - expected6.re) < 1e-10);
        assert(Math.abs(result6.im - expected6.im) < 1e-10);
        
        // Test 7: acsch(2+3i) - another general complex number
        let complex23 = new complex_js(2, 3);
        let result7 = complex23.acsch();
        // d = 4 + 9 = 13, so (2-3i)/13
        let expected7 = new complex_js(2/13, -3/13).asinh();
        assert(Math.abs(result7.re - expected7.re) < 1e-10);
        assert(Math.abs(result7.im - expected7.im) < 1e-10);
        
        done();
    });
});