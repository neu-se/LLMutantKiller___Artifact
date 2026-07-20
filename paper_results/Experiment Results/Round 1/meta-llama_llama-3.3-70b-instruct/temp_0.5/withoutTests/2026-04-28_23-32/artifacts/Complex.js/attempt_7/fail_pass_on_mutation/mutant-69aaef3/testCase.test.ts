function hypot(a, b) {
  var a = Math.abs(a);
  var b = Math.abs(b);

  if (a < 3000 && b < 3000) {
    return Math.sqrt(a * a + b * b);
  }

  if (a < b) {
    a = b;
    b = a / b;
  } else {
    b = b / a;
  }
  return a * Math.sqrt(1 + b * b);
}

describe('hypot', () => {
  it('should calculate hypot correctly for a = 3 and b = 4', () => {
    const result = hypot(3, 4);
    expect(result).toBeCloseTo(5);
  });

  it('should calculate hypot correctly for a = 0 and b = 4', () => {
    const result = hypot(0, 4);
    expect(result).toBeCloseTo(4);
  });

  it('should calculate hypot correctly for a = 3 and b = 0', () => {
    const result = hypot(3, 0);
    expect(result).toBeCloseTo(3);
  });

  it('should calculate hypot correctly for a = 0 and b = 0', () => {
    const result = hypot(0, 0);
    expect(result).toBeCloseTo(0);
  });

  it('should not be equal to a * sqrt(1 + b / b) for a = 3 and b = 4', () => {
    const result = hypot(3, 4);
    expect(result).not.toBeCloseTo(3 * Math.sqrt(1 + 4 / 4));
  });
});