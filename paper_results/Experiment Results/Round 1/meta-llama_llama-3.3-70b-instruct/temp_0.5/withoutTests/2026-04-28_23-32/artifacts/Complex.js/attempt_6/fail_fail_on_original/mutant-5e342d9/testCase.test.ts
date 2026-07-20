const Complex = (function(root) {
  // ... (rest of the Complex.js code remains the same)
})(this);

describe('Complex', () => {
  it('should calculate the hypotenuse correctly', () => {
    const result = Complex.hypot(3001, 1);
    expect(result).toBeCloseTo(3001 * Math.sqrt(1 + 1 * 1 / (3001 * 3001)));
  });
});