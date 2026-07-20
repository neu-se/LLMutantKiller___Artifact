import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate asec correctly', () => {
    const complex = new Complex(2, 0);
    const asec = complex.asec();
    expect(asec.re).toBeCloseTo(0);
    expect(asec.im).toBeCloseTo(0);
  });
});