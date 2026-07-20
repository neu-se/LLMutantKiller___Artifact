import Complex from "./complex.js";

describe('Complex', () => {
  it('should be able to create an instance and access its properties', () => {
    const complex = new Complex(1, 2);
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
  });
});