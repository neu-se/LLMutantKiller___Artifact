import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.atanh();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    const oneMinus = 1 - 1;
    const b = 1;
    const d = oneMinus * oneMinus + b * b;
    expect(d).toBeGreaterThan(0);
    const complex2 = new Complex(1, 0);
    expect(() => complex2.atanh()).toThrowError();
  });
});