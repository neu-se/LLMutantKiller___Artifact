const Complex = (function(root) {
  // ... (rest of the Complex.js code remains the same)
})(this);

describe('Complex', () => {
  it('should calculate the hypotenuse correctly', () => {
    const c1 = new Complex(3, 4);
    const c2 = new Complex(4, 3);
    expect(c1.abs()).toBeCloseTo(c2.abs());
  });
});