function hypot(a: number, b: number): number {
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

function hypotMutated(a: number, b: number): number {
  return a * Math.sqrt(1 + b / b);
}

describe('hypot', () => {
  it('should return the correct result for a = 3 and b = 4', () => {
    const result = hypot(3, 4);
    expect(result).toBeCloseTo(5);
  });

  it('should return the correct result for a = 0 and b = 4', () => {
    const result = hypot(0, 4);
    expect(result).toBeCloseTo(4);
  });

  it('should return the correct result for a = 3 and b = 0', () => {
    const result = hypot(3, 0);
    expect(result).toBeCloseTo(3);
  });

  it('should return the correct result for a = 0 and b = 0', () => {
    const result = hypot(0, 0);
    expect(result).toBeCloseTo(0);
  });

  it('should return a different result than hypotMutated for a = 3 and b = 4', () => {
    const result = hypot(3, 4);
    const resultMutated = hypotMutated(3, 4);
    expect(result).not.toBeCloseTo(resultMutated);
  });
});