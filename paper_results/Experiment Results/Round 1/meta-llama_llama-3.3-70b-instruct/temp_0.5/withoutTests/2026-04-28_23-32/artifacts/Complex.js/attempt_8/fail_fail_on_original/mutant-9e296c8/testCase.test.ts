import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number calculations', () => {
  it('should correctly calculate csch', () => {
    const complex = new Complex(1, 1);
    const csch = complex['csch']();
    expect(csch['re']).toBeCloseTo(-0.30393100162842646, 10);
    expect(csch['im']).toBeCloseTo(-0.30393100162842646, 10);
  });
});