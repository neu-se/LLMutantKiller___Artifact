import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh and maintain the complex number structure", () => {
    const c = new Complex(1.5, 2);
    const result = c.acosh();
    // This test verifies the structure is preserved by checking both properties exist
    expect(result.re).toBeDefined();
    expect(result.im).toBeDefined();
    // And verifies the actual computation
    expect(result.re).toBeCloseTo(1.762747174039086);
    expect(result.im).toBeCloseTo(1.1566239222452403);
  });
});