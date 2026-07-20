function logHypot(a: number, b: number): number {
  var _a = Math.abs(a);
  var _b = Math.abs(b);
  if (_a < 3000 && _b < 3000) {
    return Math.log(_a * _a + _b * _b) * 0.5;
  } else {
    var a = _a / 2;
    var b = _b / 2;
    return 0.5 * Math.log(a * a + b * b) + Math.LN2;
  }
}

describe('logHypot', () => {
  it('should calculate logHypot correctly', () => {
    const result = logHypot(3001, 3000);
    const expected = 0.5 * Math.log(3001 * 3001 + 3000 * 3000) / 2;
    expect(result).toBeCloseTo(0.5 * Math.log(3001 * 3001 + 3000 * 3000) / 2, 10);
  });
});