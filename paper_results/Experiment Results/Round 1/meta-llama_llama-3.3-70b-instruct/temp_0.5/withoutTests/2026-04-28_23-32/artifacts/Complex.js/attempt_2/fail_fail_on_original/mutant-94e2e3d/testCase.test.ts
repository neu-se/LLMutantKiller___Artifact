import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should handle pow correctly', () => {
    const c = new Complex(0, 0);
    const z = new Complex(1, 0);
    const result = c.pow(z);
    expect(result.re).toBeCloseTo(1);
    expect(result.im).toBeCloseTo(0);
  });

  // it('should throw an error when the base is zero and the exponent is positive', () => {
  //   const c = new Complex(0, 0);
  //   const z = new Complex(0.5, 0);
  //   expect(() => c.pow(z)).toThrowError();
  // });
});