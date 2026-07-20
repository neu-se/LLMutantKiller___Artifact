import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex NaN parse", () => {
  it("should handle array input [NaN, 0] producing complex with NaN re and valid im", () => {
    // Array input: z.re = NaN, z.im = 0
    // If 'return z' is inside the if block:
    //   Original (||): isNaN(NaN)||isNaN(0)=true -> enters block -> returns z
    //   Mutated (&&): isNaN(NaN)&&isNaN(0)=false -> skips block -> falls to parser_exit -> throws
    // Test: should NOT throw and should produce NaN complex
    const c = new Complex([NaN, 0]);
    expect(c.isNaN()).toBe(true);
    expect(c['im']).toBe(0);
  });
});