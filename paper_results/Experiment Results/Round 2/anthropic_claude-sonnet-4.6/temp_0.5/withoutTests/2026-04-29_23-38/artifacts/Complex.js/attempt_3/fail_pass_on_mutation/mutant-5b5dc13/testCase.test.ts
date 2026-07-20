import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("computes acsch with tiny values where d underflows to 0 and a is non-zero", () => {
    // With a = tiny, b = tiny: d = a*a + b*b underflows to 0
    // b !== 0 so the early b===0 return is skipped
    // Original: (a !== 0) ? a/0 : 0 => Infinity => new Complex(Infinity, 0).asinh()
    // Mutated:  (a === 0) ? a/0 : 0 => 0        => new Complex(0, 0).asinh()
    const tiny = 5e-324;
    const c = new Complex(tiny, tiny);
    const result = c.acsch();
    // new Complex(0, 0).asinh() = 0, new Complex(Infinity, 0).asinh() != 0
    // So original result should differ from mutated result (0)
    // Check that result is NOT equal to new Complex(0,0).asinh()
    const zeroAsinh = new Complex(0, 0).asinh();
    expect(result.re === zeroAsinh.re && result.im === zeroAsinh.im).toBe(false);
  });
});