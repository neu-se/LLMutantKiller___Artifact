import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch fallback branch mutation detection", () => {
  it("produces NaN when acsch is called with subnormal values causing d to underflow, with nonzero a and negative b", () => {
    const a = Number.MIN_VALUE;
    const b = -Number.MIN_VALUE;

    // Verify preconditions
    expect(a * a + b * b).toBe(0); // d underflows to 0
    expect(b).not.toBe(0);         // skips early return
    expect(a).not.toBe(0);         // a !== 0 matters for the mutation

    const result = new Complex(a, b).acsch();

    // Original: re = (a !== 0) ? a/0 : 0 = Infinity, im = -b/0 = Infinity
    //   => asinh(Infinity + Infinity*i) = NaN
    // Mutated:  re = (false) ? a/0 : 0 = 0, im = -b/0 = Infinity
    //   => asinh(0 + Infinity*i) = Complex(Infinity, PI/2) - not NaN
    expect(isNaN(result.re)).toBe(true);
  });
});