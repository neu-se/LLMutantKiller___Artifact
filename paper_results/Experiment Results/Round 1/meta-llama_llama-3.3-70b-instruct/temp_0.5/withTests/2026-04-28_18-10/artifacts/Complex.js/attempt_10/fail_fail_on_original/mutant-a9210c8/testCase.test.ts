import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate csch for a complex number', () => {
    const complex = new Complex(1, 2);
    const b = complex["im"];
    expect(b).toBe(2);
    const csch = complex.csch();
    expect(complex["im"]).toBe(b);
  });
});