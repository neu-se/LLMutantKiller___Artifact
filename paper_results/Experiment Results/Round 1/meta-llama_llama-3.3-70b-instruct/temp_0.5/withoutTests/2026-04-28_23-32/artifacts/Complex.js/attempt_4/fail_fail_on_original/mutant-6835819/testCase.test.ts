import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(0.5, 0.5);
    const result = complex.atanh();
    const originalResult = new Complex((onePlus * oneMinus - b * b) / d, (b * oneMinus + onePlus * b) / d);
    expect(result.re).not.toBeCloseTo(originalResult.re, 10);
    expect(result.im).not.toBeCloseTo(originalResult.im, 10);
  });
});

const onePlus = 1 + 0.5;
const oneMinus = 1 - 0.5;
const b = 0.5;
const d = oneMinus * oneMinus + b * b;