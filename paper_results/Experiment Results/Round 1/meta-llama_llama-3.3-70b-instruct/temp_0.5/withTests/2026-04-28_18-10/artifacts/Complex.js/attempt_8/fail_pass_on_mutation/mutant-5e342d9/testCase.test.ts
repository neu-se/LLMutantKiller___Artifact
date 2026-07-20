function hypot(x, y) {
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
}

describe('Complex', () => {
  it('should calculate the hypot function correctly', () => {
    const result = hypot(1, 1);
    expect(result).toBeCloseTo(1.4142135623730951);
  });
});