import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosm1(x) correctly for small values of x', () => {
    const x = 0.01;
    const complex = new Complex(x);
    const result = complex.cos().sub(1);
    const expected = Math.cos(x) - 1;
    const cosm1Original = x * x * (
      x * x * (
        x * x * (
          x * x * (
            x * x * (
              x * x * (
                x * x / 20922789888000
                - 1 / 87178291200
              ) + 1 / 479001600
            ) - 1 / 3628800
          )
        )
      )
    );
    const cosm1Mutated = x * x * (
      x * x * (
        x * x * (
          x * x * (
            x * x * (
              x * x / 20922789888000
              - 1 / 87178291200
            ) + 1 / 479001600
          ) + 1 / 3628800
        )
      )
    );
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
    expect(cosm1Original).toBeCloseTo(expected, 15);
    expect(cosm1Mutated).not.toBeCloseTo(expected, 15);
  });
});