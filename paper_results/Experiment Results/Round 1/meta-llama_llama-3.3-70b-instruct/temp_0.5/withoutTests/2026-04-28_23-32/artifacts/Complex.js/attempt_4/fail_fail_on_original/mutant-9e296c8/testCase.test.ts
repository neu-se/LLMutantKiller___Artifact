import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number calculations', () => {
  it('should correctly calculate csch', () => {
    const complex = new Complex(1, 1);
    const cschOriginal = new Complex(-0.2215009308505094, -0.2215009308505094);
    const csch = complex['csch']();
    expect(csch['re']).toBeCloseTo(cschOriginal['re'], 10);
    expect(csch['im']).toBeCloseTo(cschOriginal['im'], 10);
  });
});