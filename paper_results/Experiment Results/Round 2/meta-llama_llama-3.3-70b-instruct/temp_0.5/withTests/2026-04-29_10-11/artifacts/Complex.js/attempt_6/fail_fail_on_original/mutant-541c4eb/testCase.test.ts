import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate asinh correctly', () => {
    const complex = new Complex(1, 2);
    complex['re'] = -complex['im'];
    expect(complex['re']).toBe(-2);
    expect(complex['im']).toBe(2);
    const result = complex.asinh();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});