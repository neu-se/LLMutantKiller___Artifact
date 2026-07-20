const Complex = (function(root) {
  // ... (rest of the Complex.js code remains the same)
})(this);

describe('Complex', () => {
  it('should calculate the hypotenuse correctly', () => {
    const c1 = new Complex(3000, 1);
    const c2 = new Complex(1, 3000);
    expect(c1.abs()).not.toBeCloseTo(c2.abs());
  });
});