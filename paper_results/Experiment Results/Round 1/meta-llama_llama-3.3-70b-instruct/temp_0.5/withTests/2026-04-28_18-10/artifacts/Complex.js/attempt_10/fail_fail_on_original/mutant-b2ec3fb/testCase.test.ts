describe('Complex', () => {
  it('should correctly floor the real part of a complex number', () => {
    const complex = { re: 10.5, im: 2, floor: function(places) { return { re: Math.floor(this.re * places) / places, im: Math.floor(this.im * places) / places }; } };
    const floored = complex.floor(1);
    expect(floored.re).toBe(10.5);
    expect(floored.im).toBe(2);
  });
});