import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acosh correctly for a specific input', () => {
    const complex = new Complex(2, 0);
    const result = complex.acosh();
    expect(result['re']).not.toBeNaN();
    expect(result['im']).not.toBeNaN();
    expect(result['re']).not.toBeUndefined();
    expect(result['im']).not.toBeUndefined();
  });
});