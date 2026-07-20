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
    const result = hypot(3001, 1);
    const result2 = hypot(1, 3001);
    expect(result).toBeCloseTo(result2);
  });
});