import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate csch correctly', () => {
    const complex = new Complex(1, 1);
    const csch = complex['csch']();
    expect(csch).toBeInstanceOf(Complex);
    expect(csch['re']).not.toBeNaN();
    expect(csch['im']).not.toBeNaN();
  });
});