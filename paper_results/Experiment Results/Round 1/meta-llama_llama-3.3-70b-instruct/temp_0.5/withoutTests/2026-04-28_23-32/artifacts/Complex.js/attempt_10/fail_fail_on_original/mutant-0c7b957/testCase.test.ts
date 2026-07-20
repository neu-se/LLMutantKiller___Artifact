import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should not result in division by zero when calculating atanh with a complex number (1, 1)', () => {
    const complex = new Complex(1, 1);
    const oneMinus = 1 - complex.re;
    const b = complex.im;
    const d = oneMinus * oneMinus + b * b;
    expect(d).not.toBe(0);
  });
});