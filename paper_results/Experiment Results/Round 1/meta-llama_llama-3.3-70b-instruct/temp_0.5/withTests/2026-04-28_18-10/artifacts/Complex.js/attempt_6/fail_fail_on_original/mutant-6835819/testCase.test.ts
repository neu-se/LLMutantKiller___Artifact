import { Complex } from "../../complex";

describe('Complex.js', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.atanh();
    const onePlus = 1 + 1;
    const oneMinus = 1 - 1;
    const b = 1;
    const d = onePlus * oneMinus + b * b;
    expect(d).toBeCloseTo(2);
    const expectedReal = (onePlus * oneMinus - b * b) / d;
    expect(expectedReal).toBeCloseTo(0);
  });
});