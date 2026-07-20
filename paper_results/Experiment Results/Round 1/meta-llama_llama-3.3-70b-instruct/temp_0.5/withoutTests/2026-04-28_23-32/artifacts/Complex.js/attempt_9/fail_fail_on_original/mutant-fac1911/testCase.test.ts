import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate acsch', () => {
    const complex = new Complex(1, 1);
    const acsch = complex.acsch();
    expect(acsch.re).toBeCloseTo(-0.481, 3);
    expect(acsch.im).toBeCloseTo(-0.398, 3);
  });
});