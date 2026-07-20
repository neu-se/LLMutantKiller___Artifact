import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow with fully imaginary base", () => {
  it("should correctly compute pow when base is fully imaginary (re=0)", () => {
    // When base is fully imaginary (a=0, b=2) and exponent is real integer
    // The original code handles this case with the switch statement
    // The mutated code (else if (false)) skips this branch entirely
    
    // (2i)^2 = -4, so re=-4, im=0
    const result = new Complex(0, 2).pow(2);
    
    // With original code: case 2 -> new Complex(-Math.pow(2, 2), 0) = new Complex(-4, 0)
    // With mutated code: falls through to general formula which may give different result
    expect(result.re).toBeCloseTo(-4, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});