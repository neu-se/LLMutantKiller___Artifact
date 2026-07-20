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

describe('hypot', () => {
  it('should calculate hypot correctly', () => {
    const a = 3001;
    const b = 3000;
    const result1 = hypot(a, b);
    const result2 = hypot(b, a);
    expect(result1).toBeCloseTo(result2);
  });
});