Your task is to write a test for the following function:
```
complex.js.ZERO.add(a, b)
```

This function is defined as follows:
```
function(a, b) {

      var z = new Complex(a, b);

      // Infinity + Infinity = NaN
      if (this['isInfinite']() && z['isInfinite']()) {
        return Complex['NAN'];
      }

      // Infinity + z = Infinity { where z != Infinity }
      if (this['isInfinite']() || z['isInfinite']()) {
        return Complex['INFINITY'];
      }

      return new Complex(
        this['re'] + z['re'],
        this['im'] + z['im']);
    }
```

You may use the following examples to guide your implementation:
```
// usage #1
function quadraticRoot(a, b, c) {  let sqrt = Complex(b * b - 4 * a * c).sqrt()  let x1 = Complex(-b).add(sqrt).div(2 * a)  let x2 = Complex(-b).sub(sqrt).div(2 * a)  return {x1, x2}}// quadraticRoot(1, 4, 5) -> -2 ± i
// usage #2
/* * A gamma function implementation based on Lanczos Approximation * https://en.wikipedia.org/wiki/Lanczos_approximation */var Complex = require('../complex');var P = [Complex(0.99999999999980993),  Complex(676.5203681218851), Complex(-1259.1392167224028), Complex(771.32342877765313),  Complex(-176.61502916214059), Complex(12.507343278686905), Complex(-0.13857109526572012),  Complex(9.9843695780195716e-6), Complex(1.5056327351493116e-7)];var SQRT2PI = Complex(Math.sqrt(2 * Math.PI));function gamma(z) {  z = z.sub(1);  var x = P[0];  var t = z.add(7.5);
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');
describe('test complex_js', function() {
    it('test complex.js.ZERO.add', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.