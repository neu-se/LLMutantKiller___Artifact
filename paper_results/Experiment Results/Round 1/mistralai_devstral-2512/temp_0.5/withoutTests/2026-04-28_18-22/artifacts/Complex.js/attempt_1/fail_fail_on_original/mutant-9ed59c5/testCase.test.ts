// Test case to detect the mutation in complex.js
import { Complex } from "./complex.js";

describe("Complex.js module export", () => {
  it("should properly export Complex when using require", () => {
    // This test verifies that the module exports work correctly
    // The mutation breaks the AMD/CommonJS export logic
    const ComplexModule = require("./complex.js");
    expect(ComplexModule).toBeDefined();
    expect(ComplexModule.Complex).toBeDefined();
    expect(typeof ComplexModule.Complex).toBe("function");

    // Verify we can create a complex number instance
    const c = new ComplexModule.Complex(1, 2);
    expect(c.re).toBe(1);
    expect(c.im).toBe(2);
  });
});