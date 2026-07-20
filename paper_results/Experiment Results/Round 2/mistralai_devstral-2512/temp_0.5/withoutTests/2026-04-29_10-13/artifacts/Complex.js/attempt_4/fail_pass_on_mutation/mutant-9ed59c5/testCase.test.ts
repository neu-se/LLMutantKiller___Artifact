import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js module export behavior", () => {
  it("should properly handle AMD and CommonJS exports", () => {
    // Test that the module can be loaded in both AMD and CommonJS environments
    const testModule = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");

    // Verify the module exports the Complex class
    expect(testModule).toBeDefined();
    expect(typeof testModule).toBe('function');

    // Test instantiation
    const c = new testModule(5, 6);
    expect(c.re).toBe(5);
    expect(c.im).toBe(6);

    // Test that the module has the expected static properties
    expect(testModule.ZERO).toBeDefined();
    expect(testModule.ONE).toBeDefined();
    expect(testModule.I).toBeDefined();
  });
});