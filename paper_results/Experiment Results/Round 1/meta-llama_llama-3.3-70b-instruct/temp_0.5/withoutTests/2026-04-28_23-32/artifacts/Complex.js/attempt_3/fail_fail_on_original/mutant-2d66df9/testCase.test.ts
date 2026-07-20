import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly parse complex numbers from strings', () => {
    const complexNumber = new Complex('3-4i');
    expect(complexNumber.re).toBeCloseTo(3);
    expect(complexNumber.im).toBeCloseTo(-4);
  });
});