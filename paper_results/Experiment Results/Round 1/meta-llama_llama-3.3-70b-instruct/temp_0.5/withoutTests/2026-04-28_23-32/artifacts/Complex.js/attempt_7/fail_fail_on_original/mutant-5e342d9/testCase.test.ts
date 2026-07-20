const Complex = (function(root) {
  // ... (rest of the Complex.js code remains the same)
})(this);

describe('Complex', () => {
  it('should calculate the hypotenuse correctly', () => {
    const result1 = Complex.hypot(3001, 1);
    const result2 = Complex.hypot(1, 3001);
    expect(result1).toBeCloseTo(result2);
  });
});