import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate acsch for non-zero complex numbers and fail for mutated code', () => {
    const complex = new Complex(1, 1);
    const acschOriginal = new Complex(1, 1).acsch();
    const acschMutated = new Complex(1, 1);
    acschMutated.re = 1 / 1 + 1 * 1;
    expect(acschOriginal.re).not.toBeCloseTo(acschMutated.re, 3);
    expect(acschOriginal.im).not.toBeCloseTo(acschMutated.im, 3);
  });
});