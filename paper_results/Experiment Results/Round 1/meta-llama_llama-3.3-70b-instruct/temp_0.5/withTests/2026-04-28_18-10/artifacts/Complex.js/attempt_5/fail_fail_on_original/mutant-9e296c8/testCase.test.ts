import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should return correct csch value for a specific input', () => {
    const complex = new Complex(1, 1);
    const cschOriginal = new Complex(0.30393100162842646, -0.30393100162842646);
    const csch = complex['csch']();
    expect(csch['re']).toBeCloseTo(cschOriginal['re'], 10);
    expect(csch['im']).toBeCloseTo(cschOriginal['im'], 10);
  });
});