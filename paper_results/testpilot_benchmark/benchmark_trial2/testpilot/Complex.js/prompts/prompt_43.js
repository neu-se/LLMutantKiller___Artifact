The test:
```
let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.mul', function(done) {
        // Test ZERO * real number = ZERO
        let result1 = complex_js.ZERO.mul(5, 0);
        assert.strictEqual(result1.re, 0);
        assert.strictEqual(result1.im, 0);

        // Test ZERO * complex number = ZERO
        let result2 = complex_js.ZERO.mul(3, 4);
        assert.strictEqual(result2.re, 0);
        assert.strictEqual(result2.im, 0);

        // Test ZERO * ZERO = ZERO
        let result3 = complex_js.ZERO.mul(0, 0);
        assert.strictEqual(result3.re, 0);
        assert.strictEqual(result3.im, 0);

        // Test ZERO * negative numbers = ZERO
        let result4 = complex_js.ZERO.mul(-2, -3);
        assert.strictEqual(result4.re, 0);
        assert.strictEqual(result4.im, 0);

        // Test ZERO * pure imaginary = ZERO
        let result5 = complex_js.ZERO.mul(0, 7);
        assert.strictEqual(result5.re, 0);
        assert.strictEqual(result5.im, 0);

        // Test ZERO * INFINITY = NaN (special case)
        let result6 = complex_js.ZERO.mul(Infinity, 0);
        assert.ok(isNaN(result6.re));
        assert.ok(isNaN(result6.im));

        // Test ZERO * complex infinity = NaN
        let result7 = complex_js.ZERO.mul(Infinity, Infinity);
        assert.ok(isNaN(result7.re));
        assert.ok(isNaN(result7.im));

        done();
    });
});
``` 
failed with the following error message:
```
Expected values to be strictly equal:
+ actual - expected

+ -0
- 0  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.