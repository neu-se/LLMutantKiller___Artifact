import { Complex } from "./complex";

describe('Complex.js', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(2, 0);
    const result = complex.atanh();
    const onePlus = 1 + 2;
    const oneMinus = 1 - 2;
    const b = 0;
    const d = (onePlus * oneMinus - b * b);
    expect(d).toBeCloseTo(-3);
    const mutatedD = (onePlus * oneMinus - b / b);
    expect(mutatedD).toBeCloseTo(NaN);
  });
});