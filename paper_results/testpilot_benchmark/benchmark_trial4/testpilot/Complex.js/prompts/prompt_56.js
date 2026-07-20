Your task is to write a test for the following function:
```
complex.js.ZERO.div(a, b)
```

This function is defined as follows:
```
function(a, b) {

      var z = new Complex(a, b);

      // 0 / 0 = NaN and Infinity / Infinity = NaN
      if ((this['isZero']() && z['isZero']()) || (this['isInfinite']() && z['isInfinite']())) {
        return Complex['NAN'];
      }

      // Infinity / 0 = Infinity
      if (this['isInfinite']() || z['isZero']()) {
        return Complex['INFINITY'];
      }

      // 0 / Infinity = 0
      if (this['isZero']() || z['isInfinite']()) {
        return Complex['ZERO'];
      }

      a = this['re'];
      b = this['im'];

      var c = z['re'];
      var d = z['im'];
      var t, x;

      if (0 === d) {
        // Divisor is real
        return new Complex(a / c, b / c);
      }

      if (Math.abs(c) < Math.abs(d)) {

        x = c / d;
        t = c * x + d;

        return new Complex(
          (a * x + b) / t,
          (b * x - a) / t);

      } else {

        x = d / c;
        t = d * x + c;

        return new Complex(
          (a + b * x) / t,
          (b - a * x) / t);
      }
    }
```

You may use the following examples to guide your implementation:
```
// usage #1
let Complex = require('complex.js');let c = new Complex("99.3+8i");c.mul({re: 3, im: 9}).div(4.9).sub(3, 2);
// usage #2
function quadraticRoot(a, b, c) {  let sqrt = Complex(b * b - 4 * a * c).sqrt()  let x1 = Complex(-b).add(sqrt).div(2 * a)  let x2 = Complex(-b).sub(sqrt).div(2 * a)  return {x1, x2}}// quadraticRoot(1, 4, 5) -> -2 ± i
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');
describe('test complex_js', function() {
    it('test complex.js.ZERO.div', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.