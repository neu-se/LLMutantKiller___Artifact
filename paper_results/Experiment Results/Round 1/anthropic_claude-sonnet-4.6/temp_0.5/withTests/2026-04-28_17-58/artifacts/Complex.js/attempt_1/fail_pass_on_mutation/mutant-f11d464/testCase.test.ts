import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow with fully imaginary base", () => {
  it("should correctly compute pow when base is fully imaginary (re=0)", () => {
    // When base is fully imaginary (a=0, b!=0) and exponent is a real integer,
    // the result should cycle through i^n pattern:
    // i^0 = 1, i^1 = i, i^2 = -1, i^3 = -i
    // For base = i (re=0, im=1) and exponent = 2:
    // case 2: return new Complex(-Math.pow(b, z['re']), 0) = new Complex(-1, 0)
    const base = new Complex(0, 1); // purely imaginary: i
    const result = base.pow(2);
    // i^2 = -1
    expect(result.re).toBeCloseTo(-1, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});