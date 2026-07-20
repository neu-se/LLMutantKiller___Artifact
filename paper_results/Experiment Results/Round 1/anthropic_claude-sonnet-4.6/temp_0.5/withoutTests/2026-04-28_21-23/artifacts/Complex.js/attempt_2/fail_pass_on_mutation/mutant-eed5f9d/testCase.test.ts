import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch fallback branch mutation detection", () => {
  it("produces NaN when acsch is called with subnormal values that cause d to underflow to zero with nonzero a", () => {
    // Number.MIN_VALUE squared underflows to 0 in JavaScript
    // a = Number.MIN_VALUE, b = -Number.MIN_VALUE:
    //   d = a*a + b*b = 0 (underflow), but b !== 0 (skips early return)
    // This triggers the fallback branch in acsch:
    //   Original: re = (a !== 0) ? a/0 : 0 = Infinity
    //   Mutated:  re = (false) ? a/0 : 0 = 0
    // Leading to:
    //   Original: asinh(Infinity + Infinity*i) = NaN
    //   Mutated:  asinh(0 + Infinity*i) = Complex(Infinity, PI/2)
    const a = Number.MIN_VALUE;
    const b = -Number.MIN_VALUE;

    expect(a * a + b * b).toBe(0);
    expect(b).not.toBe(0);
    expect(a).not.toBe(0);

    const result = new Complex(a, b).acsch();

    // Original code produces NaN due to asinh(Infinity + Infinity*i)
    expect(isNaN(result.re)).toBe(true);
  });
});