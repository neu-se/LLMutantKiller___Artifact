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
  it('should calculate hypot correctly', () => {
    expect(hypot(3, 4)).toBeCloseTo(5);
    expect(hypot(0, 0)).toBeCloseTo(0);
    expect(hypot(3, 0)).toBeCloseTo(3);
    expect(hypot(0, 4)).toBeCloseTo(4);
  });
});