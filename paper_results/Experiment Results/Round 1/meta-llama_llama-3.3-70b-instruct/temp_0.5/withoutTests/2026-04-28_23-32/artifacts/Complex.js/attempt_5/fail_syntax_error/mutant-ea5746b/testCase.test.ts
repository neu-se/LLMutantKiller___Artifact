import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate cosm1 correctly', () => {
    const x = 0.01;
    const resultOriginal = Complex.cosm1(x);
    const resultFromFormulaOriginal = x * x * (
      x * x * (
        x * x * (
          x * x / (x * x * (x * x / 20922789888000 - 1 / 87178291200) + 1 / 479001600)
          + 1 / 24)
        - 1 / 2);
    const resultFromFormulaMutated = x * x * (x * x * (x * x * (x * x / 20922789888000 - 1 / 87178291200) - 1 / 479001600));
    expect(Math.abs(resultOriginal - resultFromFormulaOriginal) < 1e-9).toBe(true);
    expect(Math.abs(resultOriginal - resultFromFormulaMutated) < 1e-9).not.toBe(true);
  });
});