import { Complex } from "../../complex";

describe('Complex.js', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0, 5);
    expect(result.im).toBeCloseTo(0, 5);
    const onePlus = 1 + 1;
    const oneMinus = 1 - 1;
    const b = 1;
    const d = (onePlus * oneMinus - b * b) / (onePlus * oneMinus + b * b);
    expect(d).toBeCloseTo(0, 5);
  });
});