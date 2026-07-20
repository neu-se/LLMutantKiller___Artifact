const Complex = (function(root) {
  'use strict';

  var cosh = Math.cosh || function(x) {
    return Math.abs(x) < 1e-9 ? 1 - x : (Math.exp(x) + Math.exp(-x)) * 0.5;
  };

  var sinh = Math.sinh || function(x) {
    return Math.abs(x) < 1e-9 ? x : (Math.exp(x) - Math.exp(-x)) * 0.5;
  };

  var cosm1 = function(x) {
    var b = Math.PI / 4;
    if (-b > x || x > b) {
      return Math.cos(x) - 1.0;
    }

    var xx = x * x;
    return xx * (
      xx * (
        xx * (
          xx * (
            xx * (
              xx * (
                xx * (
                  xx / 20922789888000
                  - 1 / 87178291200)
                + 1 / 479001600)
              - 1 / 3628800)
            + 1 / 40320)
          - 1 / 720)
        + 1 / 24)
      - 1 / 2);
  };

  function Complex(a, b) {
    var z = parse(a, b);
    this['re'] = z['re'];
    this['im'] = z['im'];
  }

  Complex.prototype = {
    're': 0,
    'im': 0,
    'cosm1': function(x) {
      return cosm1(x);
    }
  };

  function parse(a, b) {
    var z = { 're': 0, 'im': 0 };
    // implementation of parse function
    return z;
  }

  return Complex;
})();

describe('Complex.js', () => {
  it('should calculate cos(x) - 1 using Taylor series correctly', () => {
    const x = 0.01;
    const complex = new Complex(x);
    const result = complex.cosm1(x);
    const expected = Math.cos(x) - 1;
    expect(Math.abs(result - expected) < 1e-5).toBe(true);
  });
});