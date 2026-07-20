function hypot(a: number, b: number) {
  var _a = Math.abs(a);
  var _b = Math.abs(b);

  if (_a < 3000 && _b < 3000) {
    return Math.sqrt(_a * _a + _b * _b);
  }

  if (_a < _b) {
    _a = _b;
    _b = a / b;
  } else {
    _b = b / a;
  }
  return _a * Math.sqrt(1 + _b * _b);
}

describe('hypot', () => {
  it('should calculate hypot correctly', () => {
    const a = 2999;
    const b = 3000;
    const result = hypot(a, b);
    const expected = Math.sqrt(a * a + b * b);
    expect(result).toBeCloseTo(expected, 10);
  });
});