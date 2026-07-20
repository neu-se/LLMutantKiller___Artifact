import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow with fully imaginary base", () => {
  it("should correctly compute pow when base is fully imaginary (a === 0)", () => {
    // When base is purely imaginary (re=0, im=b), the original code handles
    // specific cases based on (z['re'] % 4 + 4) % 4
    // The mutation changes `else if (a === 0)` to `else if (false)`,
    // so these cases fall through to the general formula instead.

    // Test case: (0 + 2i)^2
    // With original: a=0, b=2, z.re=2, (2%4+4)%4 = 2 => case 2: new Complex(-Math.pow(2,2), 0) = (-4, 0)
    // With mutation: falls through to general formula
    const result = new Complex(0, 2).pow(2);
    
    expect(result.re).toBeCloseTo(-4, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});