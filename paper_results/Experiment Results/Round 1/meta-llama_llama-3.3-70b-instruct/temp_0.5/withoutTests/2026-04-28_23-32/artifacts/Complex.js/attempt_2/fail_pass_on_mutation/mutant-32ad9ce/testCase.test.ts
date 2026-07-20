import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly handle NaN values', () => {
    const complex = new Complex(NaN, 1);
    expect(complex['re']).toBeNaN();
    expect(complex['im']).toBe(1);
  });
});