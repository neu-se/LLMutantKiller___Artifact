import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number calculations', () => {
  it('should correctly calculate csch', () => {
    const complex = new Complex(0, 1);
    const csch = complex['csch']();
    expect(csch['re']).toBeCloseTo(-0.8509181282393216, 10);
    expect(csch['im']).toBeCloseTo(0, 10);
  });
});