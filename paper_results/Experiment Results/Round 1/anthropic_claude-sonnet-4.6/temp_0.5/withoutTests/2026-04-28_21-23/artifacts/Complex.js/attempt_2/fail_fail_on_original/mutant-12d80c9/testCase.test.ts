import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("returns correct result for Number.MIN_VALUE where d underflows to zero", () => {
    // Number.MIN_VALUE * Number.MIN_VALUE = 0 (underflow), so d = 0
    // but a = Number.MIN_VALUE != 0
    // Original: else branch uses (a !== 0) ? a/0 : 0 = Infinity → new Complex(Infinity, 0).acosh()
    // Mutated: else branch uses (false) ? a/0 : 0 = 0 → new Complex(0, 0).acosh()
    const c = new Complex(Number.MIN_VALUE, 0);
    const result = c.asech();

    // acosh(Infinity + 0i) = Infinity (real)
    // acosh(0 + 0i) = i * PI/2 (purely imaginary)
    // These are clearly different - check that result has Infinity real part
    expect(result.re).toBe(Infinity);
  });
});