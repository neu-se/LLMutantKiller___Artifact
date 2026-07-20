import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should return correct csch value for a specific input', () => {
    const complex = new Complex(1, 1);
    const csch = complex['csch']();
    expect(csch['re']).toBeCloseTo(-0.6215180171704285, 10);
    expect(csch['im']).toBeCloseTo(-0.6215180171704285, 10);
  });
});