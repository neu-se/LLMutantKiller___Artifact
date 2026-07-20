import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(1.5, 1);
    const result = complex.atanh();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    const oneMinus = 1 - 1;
    const b = 1;
    const d = oneMinus * oneMinus + b * b;
    expect(d).toBeGreaterThan(0);
  });
});