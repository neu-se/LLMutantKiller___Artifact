import { Complex } from "../../complex.js";

describe('Complex', () => {
  it('should correctly parse a complex number from a string', () => {
    const complex = new Complex('1');
    expect(complex.re).toBeCloseTo(1, 10);
    expect(complex.im).toBeCloseTo(0, 10);
  });
});