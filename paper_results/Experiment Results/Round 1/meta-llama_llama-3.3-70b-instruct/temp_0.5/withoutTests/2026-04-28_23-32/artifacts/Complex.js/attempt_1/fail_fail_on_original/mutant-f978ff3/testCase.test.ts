import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex csch', () => {
    const complex = new Complex(1, 1);
    const result = complex['csch']();
    expect(result['re']).toBeCloseTo(-0.8686709614860096, 10);
    expect(result['im']).toBeCloseTo(-0.6218263714738794, 10);
  });
});