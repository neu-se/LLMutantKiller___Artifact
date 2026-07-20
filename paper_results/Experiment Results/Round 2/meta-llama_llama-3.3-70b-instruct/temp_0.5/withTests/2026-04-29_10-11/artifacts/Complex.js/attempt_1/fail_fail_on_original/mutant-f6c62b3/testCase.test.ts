import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should define the __esModule property correctly', () => {
    expect(Object.getOwnPropertyDescriptor(Complex, '__esModule')).toBeDefined();
    expect(Object.getOwnPropertyDescriptor(Complex, '__esModule').value).toBe(true);
  });
});