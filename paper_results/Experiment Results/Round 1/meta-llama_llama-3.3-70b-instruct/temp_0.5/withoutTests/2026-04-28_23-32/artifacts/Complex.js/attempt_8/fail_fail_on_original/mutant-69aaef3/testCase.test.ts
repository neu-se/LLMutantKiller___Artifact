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

function hypotMutated(a, b) {
  return a * Math.sqrt(1 + b / b);
}

describe('hypot', () => {
  it('should not throw an error when calculating hypot with b = 0', () => {
    expect(() => hypot(3, 0)).not.toThrowError();
    expect(() => hypotMutated(3, 0)).toThrowError();
  });
});