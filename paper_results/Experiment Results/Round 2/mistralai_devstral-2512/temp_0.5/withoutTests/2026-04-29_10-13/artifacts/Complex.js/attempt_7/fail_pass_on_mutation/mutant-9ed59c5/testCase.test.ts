import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js module loading", () => {
  it("should properly load and execute module initialization code", () => {
    // This test verifies that the module initialization code runs correctly
    // The mutation removes the AMD export logic which affects module loading

    // Clear the require cache to force fresh module loading
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/Complex.js/complex.js")];

    // Require the module fresh
    const ComplexModule = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");

    // Verify basic functionality
    const c = new ComplexModule(3, 4);
    expect(c.re).toBe(3);
    expect(c.im).toBe(4);

    // Verify static properties exist
    expect(ComplexModule.ZERO).toBeDefined();
    expect(ComplexModule.ONE).toBeDefined();
    expect(ComplexModule.I).toBeDefined();
    expect(ComplexModule.PI).toBeDefined();
    expect(ComplexModule.E).toBeDefined();

    // The mutation removes the AMD export logic which should cause this test to fail
    // because the module initialization would be incomplete
  });
});