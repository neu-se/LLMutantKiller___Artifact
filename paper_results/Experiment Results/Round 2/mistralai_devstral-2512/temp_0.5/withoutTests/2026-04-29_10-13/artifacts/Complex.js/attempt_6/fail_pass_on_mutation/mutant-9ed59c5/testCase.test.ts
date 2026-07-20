import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js export verification", () => {
  it("should have working exports in CommonJS environment", () => {
    // Test that the module exports work correctly
    const ComplexModule = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");

    // Verify the module exports the Complex class
    expect(ComplexModule).toBeDefined();
    expect(typeof ComplexModule).toBe('function');

    // Test that we can create instances
    const c1 = new ComplexModule(1, 2);
    expect(c1.re).toBe(1);
    expect(c1.im).toBe(2);

    // Test that static properties are available
    expect(ComplexModule.ZERO).toBeDefined();
    expect(ComplexModule.ONE).toBeDefined();
    expect(ComplexModule.I).toBeDefined();

    // Test that the exported class matches the imported one
    expect(ComplexModule).toBe(Complex);
  });
});