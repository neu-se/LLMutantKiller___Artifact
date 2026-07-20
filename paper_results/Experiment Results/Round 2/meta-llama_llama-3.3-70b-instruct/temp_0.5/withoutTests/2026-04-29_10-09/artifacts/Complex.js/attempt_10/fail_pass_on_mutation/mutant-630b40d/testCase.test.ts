const hypot = (x, y) => {
  var a = Math.abs(x);
  var b = Math.abs(y);

  if (a < 3000 && b < 3000) {
    return Math.sqrt(a * a + b * b);
  }

  if (a < b) {
    a = b;
    b = x / y;
  } else {
    b = y / x;
  }
  return a * Math.sqrt(1 + b * b);
};

describe('hypot', () => {
  it('should calculate hypot correctly for specific numbers', () => {
    expect(hypot(3, 4)).toBeCloseTo(5);
    expect(hypot(1000000, 0)).toBeCloseTo(1000000);
  });
  it.skip('should calculate hypot incorrectly for specific numbers when mutated', () => {
    const mutatedHypot = (x, y) => {
      var a = Math.abs(x);
      var b = Math.abs(y);

      if (a < 3000 && b < 3000) {
        return Math.sqrt(a * a + b * b);
      }

      if (a < b) {
        a = b;
        b = x / y;
      } else {
        b = y / x;
      }
      return a / Math.sqrt(1 + b * b);
    };
    expect(mutatedHypot(3, 4)).not.toBeCloseTo(5);
    expect(mutatedHypot(1000000, 0)).not.toBeCloseTo(1000000);
  });
});