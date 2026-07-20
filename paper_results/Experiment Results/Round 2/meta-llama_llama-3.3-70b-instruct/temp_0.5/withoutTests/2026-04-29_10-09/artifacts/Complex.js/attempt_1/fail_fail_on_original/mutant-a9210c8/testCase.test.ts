import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate csch correctly', () => {
    const complex = new Complex(1, 1);
    const csch = complex['csch']();
    expect(csch['re']).toBeCloseTo(-0.2727926972783476);
    expect(csch['im']).toBeCloseTo(-0.2718281828454915);
  });
});