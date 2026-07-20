import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should return correct csch value for a specific input', () => {
    const complex = new Complex(1, 0);
    const csch = complex['csch']();
    expect(csch['re']).toBeCloseTo(-2, 10);
    expect(csch['im']).toBeCloseTo(0, 10);
  });
});