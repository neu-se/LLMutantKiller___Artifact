import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number calculations', () => {
  it('should correctly calculate csch', () => {
    const complex = new Complex(1, 2);
    const csch = complex['csch']();
    expect(csch['re']).toBeCloseTo(-0.030337690830584485, 10);
    expect(csch['im']).toBeCloseTo(-0.030337690830584485, 10);
  });
});