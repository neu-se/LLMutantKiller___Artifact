import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should return the correct cosecans value', () => {
    const complex = new Complex(1, 1);
    const cosecans = complex.csc();
    expect(cosecans.re).toBeCloseTo(-0.21791549554709535);
    expect(cosecans.im).toBeCloseTo(0.2351942049086216);
  });
});