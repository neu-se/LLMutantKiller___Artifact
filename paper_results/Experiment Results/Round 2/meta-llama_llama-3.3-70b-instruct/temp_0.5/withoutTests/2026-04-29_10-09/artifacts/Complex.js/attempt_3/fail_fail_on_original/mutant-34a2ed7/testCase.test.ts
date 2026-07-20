import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly parse a complex number from a string', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBeCloseTo(1, 10);
    expect(complex.im).toBeCloseTo(2, 10);
    const complex2 = new Complex('1');
    expect(complex2.re).toBeCloseTo(1, 10);
    expect(complex2.im).toBeCloseTo(0, 10);
  });
});