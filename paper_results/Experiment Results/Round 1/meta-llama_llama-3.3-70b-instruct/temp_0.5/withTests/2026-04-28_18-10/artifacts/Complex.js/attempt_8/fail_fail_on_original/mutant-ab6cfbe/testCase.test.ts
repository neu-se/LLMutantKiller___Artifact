import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate the log of a complex number correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.log();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);

    const complex2 = new Complex(0, 0);
    expect(() => complex2.log()).toThrowError();
  });
});