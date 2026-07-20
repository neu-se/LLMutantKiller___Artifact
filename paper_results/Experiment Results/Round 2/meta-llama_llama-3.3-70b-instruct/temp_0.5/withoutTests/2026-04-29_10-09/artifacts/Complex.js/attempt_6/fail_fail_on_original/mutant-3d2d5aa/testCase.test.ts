import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acoth', () => {
    const complex = new Complex(0, 1);
    const result = complex.acoth();
    expect(result.toString()).toContain("0");
    expect(result.toString()).toContain("3.141592653589793");
  });
});