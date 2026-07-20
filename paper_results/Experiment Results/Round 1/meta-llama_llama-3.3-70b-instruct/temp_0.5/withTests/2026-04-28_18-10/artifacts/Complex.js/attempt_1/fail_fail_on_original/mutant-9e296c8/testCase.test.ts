import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should return correct csch value', () => {
    const complex = new Complex(1, 1);
    const csch = complex['csch']();
    expect(csch['re']).toBeCloseTo(-0.15109973655424326, 10);
    expect(csch['im']).toBeCloseTo(-0.3005984759368345, 10);
  });
});