function hypotOriginal(a, b) {
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

function hypotMutated(a, b) {
  var _a = Math.abs(a);
  var _b = Math.abs(b);

  if (_a <= 3000 && _b < 3000) {
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

describe('Complex', () => {
  it('should handle hypot correctly', () => {
    const a = 3000;
    const b = 0.000001;
    const resultOriginal = hypotOriginal(a, b);
    const resultMutated = hypotMutated(a, b);
    expect(resultOriginal).not.toBeCloseTo(resultMutated, 10);
  });
});