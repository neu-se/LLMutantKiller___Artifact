const Complex = (function(root) {
  // paste the entire complex.js code here, including the IIFE
  'use strict';

  var cosh = Math.cosh || function(x) {
    return Math.abs(x) < 1e-9 ? 1 - x : (Math.exp(x) + Math.exp(-x)) * 0.5;
  };

  var sinh = Math.sinh || function(x) {
    return Math.abs(x) < 1e-9 ? x : (Math.exp(x) - Math.exp(-x)) * 0.5;
  };

  // ... rest of the complex.js code ...

  return Complex;
})(this);

describe('Complex', () => {
  it('should return the correct result for acsch', () => {
    const c = new Complex(2, 1);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0.48121182505960347, 5);
    expect(result.im).toBeCloseTo(-0.48121182505960347, 5);
  });
});